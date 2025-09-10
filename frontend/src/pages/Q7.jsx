import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { House, ArrowLeft } from "react-bootstrap-icons";

export const Q7 = () => {
  const [output, setOutput] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const questionText = `
7. Goldbach's Conjecture: Every even number greater than 2 is the sum of two primes. 
Check this for numbers greater than 50 digits: 
N1 = 10^49 + 12, N2 = 10^50 + 88.
`;

  const pythonCode = `
from sympy import isprime, nextprime

def goldbach_pairs():
    def goldbach_pair(N: int):
        assert N % 2 == 0 and N > 2
        p = 2
        while p <= N // 2:
            q = N - p
            if isprime(p) and isprime(q):
                return p, q
            p = nextprime(p)
        return None

    N1 = 10 ** 49 + 12
    N2 = 10 ** 50 + 88
    pair1 = goldbach_pair(N1)
    pair2 = goldbach_pair(N2)
    return {"numbers": [N1, N2], "pairs": [pair1, pair2]}
`;

  const handleShowOutput = async () => {
    setLoading(true);
    setOutput(null);
    try {
      const res = await axios.get("http://localhost:5001/q7");
      setOutput(res.data);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  return (
    <div className="container my-5">
      <h2 className="text-center mb-4 fw-bold">Q7: Goldbach's Conjecture</h2>

      {/* Question */}
      <div className="question-box p-4 mb-4">{questionText}</div>

      {/* Python Code */}
      <div className="code-box p-3 mb-4">
        <h5 className="mb-2">Python Code (controllers.py)</h5>
        <pre>{pythonCode}</pre>
      </div>

      {/* Show Output Button */}
      <div className="text-center mb-4">
        <button className="btn-show-output" onClick={handleShowOutput} disabled={loading}>
          {loading ? "Loading..." : "Show Output"}
        </button>
      </div>

      {/* Output */}
      <div className="output-box p-3 mb-4">
        {!output && !loading && <p>Click "Show Output" to fetch the result.</p>}
        {output && (
          <div>
            <p>Numbers:</p>
            <ul>
              {output.numbers.map((num, idx) => (
                <li key={idx}>
                  {num} = {output.pairs[idx][0]} + {output.pairs[idx][1]}
                </li>
              ))}
            </ul>
            <p>Runtime: {output.runtime_seconds}s</p>
          </div>
        )}
      </div>

      {/* Navigation Buttons */}
      <div className="d-flex justify-content-between mt-4">
        <button className="btn-nav" onClick={() => navigate("/q6")}>
          <ArrowLeft /> Prev
        </button>
        <button className="btn-nav" onClick={() => navigate("/")}>
          <House /> Home
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
      `}</style>
    </div>
  );
};
