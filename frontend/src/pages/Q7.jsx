import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { House, ArrowLeft } from "react-bootstrap-icons";

export const Q7 = () => {
  const [N, setN] = useState("");
  const [output, setOutput] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const questionText = `
7. Goldbach's Conjecture: Every even number greater than 2 is the sum of two primes. 
Provide an even number greater than 2 (preferably > 50 digits) to check.
`;

  const pythonCode = `
from sympy import isprime, nextprime

def goldbach_pair(N: int):
    assert N % 2 == 0 and N > 2
    p = 2
    while p <= N // 2:
        q = N - p
        if isprime(p) and isprime(q):
            return p, q
        p = nextprime(p)
    return None
`;

  const handleShowOutput = async () => {
    setError("");
    setOutput(null);

    if (!N) {
      setError("Please enter a number.");
      return;
    }
    if (BigInt(N) % 2n !== 0n || BigInt(N) <= 2n) {
      setError("Number must be even and greater than 2.");
      return;
    }

    setLoading(true);
    try {
      // Send N as a simple parameter
      const res = await axios.get("http://localhost:5001/q7", { params: { N } });
      
      // Backend should return { number: "4", pair: ["2","2"], runtime_seconds: 0.0001 }
      setOutput(res.data);
    } catch (err) {
      console.error(err);
      setError("Server error. Please try again.");
    }
    setLoading(false);
  };

  return (
    <div className="container my-5">
      <h2 className="text-center mb-4 fw-bold">Q7: Goldbach's Conjecture</h2>

      <div className="question-box p-4 mb-4">{questionText}</div>

      <div className="code-box p-3 mb-4">
        <h5 className="mb-2">Python Code</h5>
        <pre>{pythonCode}</pre>
      </div>

      <div className="text-center mb-3">
        <label className="fw-bold me-2">Number:</label>
        <input
          type="text"
          value={N}
          onChange={(e) => setN(e.target.value.trim())}
          className="form-control d-inline-block w-auto"
          placeholder="Enter an even number"
        />
      </div>

      {error && <p className="text-danger text-center">{error}</p>}

      <div className="text-center mb-4">
        <button
          className="btn-show-output"
          onClick={handleShowOutput}
          disabled={loading}
        >
          {loading ? "Loading..." : "Show Output"}
        </button>
      </div>

      <div className="output-box p-3 mb-4">
        {!output && !loading && <p>Enter a number and click "Show Output".</p>}
        {output && (
          <div>
            <p>Number and Goldbach pair:</p>
            <p>
              {output.number} ={" "}
              {output.pair && output.pair.length === 2
                ? `${output.pair[0]} + ${output.pair[1]}`
                : "No pair found"}
            </p>
            <p>Runtime: {output.runtime_seconds}s</p>
          </div>
        )}
      </div>

      <div className="d-flex justify-content-between mt-4">
        <button className="btn-nav" onClick={() => navigate("/q6")}>
          <ArrowLeft /> Prev
        </button>
        <button className="btn-nav" onClick={() => navigate("/")}>
          <House /> Home
        </button>
      </div>

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
      `}</style>
    </div>
  );
};
