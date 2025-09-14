import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ArrowRight, ArrowLeft } from "react-bootstrap-icons";

const Q5 = () => {
  const [digits, setDigits] = useState(null);
  const [output, setOutput] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const questionText = `
5. Palindromic prime numbers are prime numbers that are also palindromes. The
simpler ones are 11 and 122333221. More interesting ones are
1223334444555554444333221 and 12233355555333221. The largest found so far is
10^1888529 − 10^944264 − 1 which has 1,888,529 digits. 
Find a palindromic prime that has at least N digits (user-defined).
`;

  const pythonCode = `
# controllers.py
import time
from gmpy2 import mpz, is_prime

def generate_palindrome(length):
    half = (length + 1) // 2
    start = 10 ** (half - 1)
    end = 10 ** half
    for i in range(start, end):
        s = str(i)
        pal = s + s[-2::-1]  # odd-length palindrome
        yield mpz(pal)

def palindromic_prime(min_digits=50):
    start_time = time.time()
    length = min_digits if min_digits % 2 == 1 else min_digits + 1
    while True:
        for pal in generate_palindrome(length):
            if is_prime(pal):
                elapsed = round(time.time() - start_time, 2)
                return {
                    "palindromic_prime": str(pal),
                    "digits": len(str(pal)),
                    "runtime_seconds": elapsed
                }
        length += 2

`;

  const handleShowOutput = async () => {
    setLoading(true);
    setOutput(null);
    try {
      const res = await axios.get("http://localhost:5001/q5", {
        params: { digits },
      });
      setOutput(res.data);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  return (
    <div className="container my-5">
      <h2 className="text-center mb-4 fw-bold">Q5: Palindromic Prime</h2>

      {/* Question */}
      <div className="question-box p-4 mb-4">{questionText}</div>

      {/* Python Code */}
      <div className="code-box p-3 mb-4">
        <h5 className="mb-2">Python Code </h5>
        <pre>{pythonCode}</pre>
      </div>

      {/* Input field for digits */}
      <div className="text-center mb-3">
        <label className="fw-bold me-2">Minimum Digits:</label>
        <input
          type="number"
          min="2"
          value={digits}
          onChange={(e) => setDigits(Number(e.target.value))}
          className="form-control d-inline-block w-auto"
        />
      </div>

      {/* Show Output Button */}
      <div className="text-center mb-4">
        <button
          className="btn-show-output"
          onClick={handleShowOutput}
          disabled={loading}
        >
          {loading ? "Loading..." : "Show Output"}
        </button>
      </div>

      {/* Output */}
      <div className="output-box p-3 mb-4">
        {!output && !loading && <p>Enter digits and click "Show Output".</p>}
        {output && (
          <div>
            {output.palindromic_prime ? (
              <>
                <p>Palindromic Prime:</p>
                <p>{output.palindromic_prime}</p>
                <p>Digits: {output.digits}</p>
              </>
            ) : (
              <p>{output.message}</p>
            )}
            <p>Runtime: {output.runtime_seconds}s</p>
          </div>
        )}
      </div>

      {/* Navigation Buttons */}
      <div className="d-flex justify-content-between mt-4">
        <button className="btn-nav" onClick={() => navigate("/q4")}>
          <ArrowLeft /> Prev
        </button>
        <button className="btn-nav" onClick={() => navigate("/q6")}>
          Next <ArrowRight />
        </button>
      </div>

      {/* Styles (unchanged) */}
      <style jsx="true">{`
        .question-box,
        .code-box,
        .output-box {
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

export default Q5;
