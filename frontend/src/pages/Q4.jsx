import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ArrowRight, ArrowLeft } from "react-bootstrap-icons";

const Q4 = () => {
  const [output, setOutput] = useState(null);
  const [loading, setLoading] = useState(false);
  const [p1, setP1] = useState(2203);
  const [p2, setP2] = useState(2281);
  const [count, setCount] = useState(4);
  const navigate = useNavigate();

  const questionText = `
4. Brocard's conjecture is the conjecture (open problem) that there are at least
four prime numbers between (p_n)^2 and (p_(n+1))^2, where p_n is the n-th prime number, for
every n ≥ 2. Use the two prime numbers you obtained in #3 and determine at least
four prime numbers between the squares of those numbers.
`;

  const pythonCode = `
from gmpy2 import mpz, next_prime

def primes_between_mersenne_squares(p1=2203, p2=2281, count=4):
    M_n1 = 2**p1 - 1
    M_n2 = 2**p2 - 1
    primes = []
    num = next_prime(mpz(M_n1)**2)
    while num < mpz(M_n2)**2 and len(primes) < count:
        primes.append(str(num))
        num = next_prime(num)
    return primes
`;

  const handleShowOutput = async () => {
    setLoading(true);
    setOutput(null);
    try {
      const res = await axios.get("http://localhost:5001/q4", {
        params: { p1, p2},
      });
      setOutput(res.data);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  return (
    <div className="container my-5">
      <h2 className="text-center mb-4 fw-bold">Q4: Primes Between Mersenne Squares</h2>

      {/* Question */}
      <div className="question-box p-4 mb-4">{questionText}</div>

      {/* Python Code */}
      <div className="code-box p-3 mb-4">
        <h5 className="mb-2">Python Code </h5>
        <pre>{pythonCode}</pre>
      </div>

      {/* Input Fields */}
      <div className="mb-4">
        <label className="form-label me-2">p1:</label>
        <input
          type="number"
          value={p1}
          onChange={(e) => setP1(e.target.value)}
          className="form-control d-inline-block w-auto me-3"
        />
        <label className="form-label me-2">p2:</label>
        <input
          type="number"
          value={p2}
          onChange={(e) => setP2(e.target.value)}
          className="form-control d-inline-block w-auto me-3"
        />
        
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
          <div className="output-wrap">
            <p>Primes between squares:</p>
            <ul>
              {output.primes.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
            <p>Runtime: {output.runtime_seconds}s</p>
          </div>
        )}
      </div>

      {/* Navigation Buttons */}
      <div className="d-flex justify-content-between mt-4">
        <button className="btn-nav" onClick={() => navigate("/q3")}>
          <ArrowLeft /> Prev
        </button>
        <button className="btn-nav" onClick={() => navigate("/q5")}>
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
        .output-wrap {
          max-height: 300px;
          overflow-y: auto;
          word-break: break-all;
          padding: 10px;
          background: #f7feff;
          border-radius: 15px;
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

export default Q4;
