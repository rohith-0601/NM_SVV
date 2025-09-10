import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ArrowRight, ArrowLeft } from "react-bootstrap-icons";

const Q3 = () => {
  const [output, setOutput] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const questionText = `
3. We are interested in Mersenne primes. A Mersenne prime is a prime number that is
one less than a power of two. The largest Mersenne prime discovered was on Oct 12, 2024 
when 2^p - 1 where p = 136,279,841. This has 41,024,320 digits. 
Find the two primes where p lies between 2201 and 2299. 
These primes were discovered in 1952.
`;

  const pythonCode = `
from sympy import isprime, primerange

def mersenne_primes_in_range(start=2201, end=2299):
    results = []
    for p in primerange(start, end + 1):
        M = 2**p - 1
        if isprime(M):
            results.append({"p": p, "mersenne_number": str(M)})
    return results
`;

  const handleShowOutput = async () => {
    setLoading(true);
    setOutput(null);
    try {
      const res = await axios.get("http://localhost:5001/q3");
      setOutput(res.data);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  return (
    <div className="container my-5">
      <h2 className="text-center mb-4 fw-bold">Q3: Mersenne Primes</h2>

      {/* Question */}
      <div className="question-box p-4 mb-4">{questionText}</div>

      {/* Python Code */}
      <div className="code-box p-3 mb-4">
        <h5 className="mb-2">Python Code</h5>
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
            <p>Mersenne Primes:</p>
            <ul>
              {output.mersenne_primes.map((item, index) => (
                <li key={index}>
                  p = {item.p}, 2^p - 1 = {item.mersenne_number}
                </li>
              ))}
            </ul>
            <p>Runtime: {output.runtime_seconds}s</p>
          </div>
        )}
      </div>

      {/* Navigation Buttons */}
      <div className="d-flex justify-content-between mt-4">
        <button className="btn-nav" onClick={() => navigate("/q2")}>
          <ArrowLeft /> Prev
        </button>
        <button className="btn-nav" onClick={() => navigate("/q4")}>
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
      `}</style>
    </div>
  );
};

export default Q3;
