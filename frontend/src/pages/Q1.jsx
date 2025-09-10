import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, ArrowLeft } from "react-bootstrap-icons";

const Q1 = () => {
  const [output, setOutput] = useState(null);
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(0);
  const eventSourceRef = useRef(null);
  const navigate = useNavigate();
  const timerRef = useRef(null);

  const questionText = `
1. A prime number is 12345678910987654321. Here n is 10. Find the next number
that follows this pattern. That number n lies between 1000 and 3000. This was
discovered by an Indian.
`;

  const pythonCode = `
import time
import gmpy2
from gmpy2 import mpz, is_prime
import sys
sys.set_int_max_str_digits(20000)

def kaprekar_number(n: int) -> int:
    num = 0
    for i in range(1, n + 1):
        num = num * (10 ** len(str(i))) + i
    for i in range(n - 1, 0, -1):
        num = num * (10 ** len(str(i))) + i
    return num

def kaprekar_like_prime_stream():
    start_time = time.time()
    for n in range(1000, 3001):
        candidate = kaprekar_number(n)
        elapsed = round(time.time() - start_time, 2)
        yield f"data: {{\\"current_n\\": {n}, \\"runtime_seconds\\": {elapsed}}}\\n\\n"
        if gmpy2.is_prime(candidate):
            yield f"data: {{\\"found\\": true, \\"n\\": {n}, \\"kaprekar_number\\": \\"{candidate}\\", \\"runtime_seconds\\": {elapsed}}}\\n\\n"
            break
`;

  const handleShowOutput = () => {
    setLoading(true);
    setOutput(null);
    setTimer(0);

    // Start timer
    timerRef.current = setInterval(() => setTimer((prev) => prev + 1), 1000);

    eventSourceRef.current = new EventSource("http://localhost:5001/q1");

    eventSourceRef.current.onmessage = (e) => {
      try {
        const data = JSON.parse(e.data);
        if (data.found) {
          setOutput(data);
          setLoading(false);
          clearInterval(timerRef.current);
          eventSourceRef.current.close();
        }
      } catch (err) {
        console.error("Error parsing event data", err);
      }
    };

    eventSourceRef.current.onerror = (err) => {
      console.error("EventSource failed:", err);
      setLoading(false);
      clearInterval(timerRef.current);
      eventSourceRef.current.close();
    };
  };

  useEffect(() => {
    return () => {
      // Clean up EventSource and timer if component unmounts
      if (eventSourceRef.current) eventSourceRef.current.close();
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  return (
    <div className="container my-5">
      <h2 className="text-center mb-4 fw-bold">Q1: Kaprekar–Like Prime</h2>

      {/* Question */}
      <div className="question-box p-4 mb-4">{questionText}</div>

      {/* Python Code */}
      <div className="code-box p-3 mb-4">
        <h5 className="mb-2">Python Code </h5>
        <pre>{pythonCode}</pre>
      </div>

      {/* Show Output Button */}
      <div className="text-center mb-4">
        <button className="btn-show-output" onClick={handleShowOutput} disabled={loading}>
          {loading ? "Searching..." : "Show Output"}
        </button>
      </div>

      {/* Output */}
      <div className="output-box p-3 mb-4 text-center">
        {loading && <p>⏱ Time elapsed: {timer}s</p>}
        {output && (
          <div>
            <p>✅ Found! n = {output.n}, Kaprekar-like prime:</p>
            <div className="scrollable-number">{output.kaprekar_number}</div>
            <p>Runtime: {output.runtime_seconds}s</p>
          </div>
        )}
        {!loading && !output && <p>Click "Show Output" to start computation.</p>}
      </div>

      {/* Navigation Buttons */}
      <div className="d-flex justify-content-between mt-4">
        <button className="btn-nav" onClick={() => navigate("/")}>
          <ArrowLeft /> Prev
        </button>
        <button className="btn-nav" onClick={() => navigate("/q2")}>
          Next <ArrowRight />
        </button>
      </div>

      {/* Styles */}
      <style jsx="true">{`
        .question-box, .code-box, .output-box {
          border-radius: 25px;
          background: linear-gradient(135deg, #e0f7fa, #ffffff);
          box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
        }
        .code-box pre {
          background: #f0faff;
          padding: 15px;
          border-radius: 15px;
          overflow-x: auto;
        }
        .btn-show-output {
          padding: 10px 20px;
          border-radius: 20px;
          background: linear-gradient(135deg, #e0f7fa, #ffffff);
          border: 2px solid #007bff20;
          box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
          cursor: pointer;
          font-weight: bold;
          transition: all 0.3s ease;
        }
        .btn-show-output:hover {
          transform: translateY(-4px) scale(1.05);
          background: linear-gradient(135deg, #d0f0ff, #f8f9fa);
          box-shadow: 0 12px 20px rgba(0, 0, 0, 0.25);
        }
        .btn-nav {
          padding: 8px 18px;
          border-radius: 20px;
          background: linear-gradient(135deg, #e0f7fa, #ffffff);
          border: 2px solid #007bff20;
          box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
          cursor: pointer;
          font-weight: bold;
          display: flex;
          align-items: center;
          gap: 5px;
          transition: all 0.3s ease;
        }
        .btn-nav:hover {
          transform: translateY(-3px) scale(1.05);
          background: linear-gradient(135deg, #d0f0ff, #f8f9fa);
          box-shadow: 0 12px 20px rgba(0, 0, 0, 0.25);
        }
        .scrollable-number {
          max-height: 200px;
          overflow: auto;
          word-break: break-all;
          background: #f0faff;
          padding: 10px;
          border-radius: 15px;
          border: 1px solid #007bff20;
          margin: 10px 0;
        }
      `}</style>
    </div>
  );
};

export default Q1;
