import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ArrowRight, ArrowLeft } from "react-bootstrap-icons";

const Q6 = () => {
  const [pValues, setPValues] = useState("2203,2281"); // allow user input if needed
  const [output, setOutput] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const questionText = `
6. A perfect number is a positive integer that is equal to the sum of its positive proper divisors, 
that is, divisors excluding the number itself. For instance, 6 has proper divisors 1, 2 and 3, 
and 1 + 2 + 3 = 6, so 6 is a perfect number. The next perfect number is 28, since 1 + 2 + 4 + 7 + 14 = 28. 
Euclid proved that if 2^P - 1 is prime, then 2^(P-1)*(2^P - 1) is a perfect number 
and then Euler proved that all even perfect numbers followed this form. 
The existence of odd perfect numbers is an open problem and it can be shown if such a number exists it should be > 10^1500. 
Using the primes in #3, prove that the above expression yields a perfect number.
`;

  const pythonCode = `
from gmpy2 import mpz

def perfect_numbers(p_values=[2203, 2281]):
    perfect_numbers = []
    for p in p_values:
        M_p = mpz(2)**p - 1
        N = (1 << (p - 1)) * M_p
        perfect_numbers.append({"p": p, "perfect_number": str(N)})
    return perfect_numbers
`;

  const handleShowOutput = async () => {
    setLoading(true);
    setOutput(null);
    try {
      const pArray = pValues.split(",").map((v) => Number(v.trim()));
      const res = await axios.get("http://localhost:5001/q6", {
        params: { p: pArray }, // pArray = [2, 23]
        paramsSerializer: (params) => {
          return params.p.map((p) => `p=${p}`).join("&");
        },
      });
      setOutput(res.data);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  return (
    <div className="container my-5">
      <h2 className="text-center mb-4 fw-bold">Q6: Perfect Numbers</h2>

      {/* Question */}
      <div className="question-box p-4 mb-4">{questionText}</div>

      {/* Python Code */}
      <div className="code-box p-3 mb-4">
        <h5 className="mb-2">Python Code</h5>
        <pre>{pythonCode}</pre>
      </div>

      {/* Optional input for primes */}
      <div className="text-center mb-3">
        <label className="fw-bold me-2">Primes (comma separated):</label>
        <input
          type="text"
          value={pValues}
          onChange={(e) => setPValues(e.target.value)}
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
        {!output && !loading && <p>Click "Show Output" to fetch the result.</p>}
        {output && (
          <div className="output-wrap">
            <p>Perfect Numbers:</p>
            <ul>
              {output.perfect_numbers.map((item, index) => (
                <li key={index}>
                  p = {item.p}, Perfect Number = {item.perfect_number}
                </li>
              ))}
            </ul>
            <p>Runtime: {output.runtime_seconds}s</p>
          </div>
        )}
      </div>

      {/* Navigation Buttons */}
      <div className="d-flex justify-content-between mt-4">
        <button className="btn-nav" onClick={() => navigate("/q5")}>
          <ArrowLeft /> Prev
        </button>
        <button className="btn-nav" onClick={() => navigate("/q7")}>
          Next <ArrowRight />
        </button>
      </div>

      {/* Styles unchanged */}
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

export default Q6;
