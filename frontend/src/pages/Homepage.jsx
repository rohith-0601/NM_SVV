import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "react-bootstrap-icons"; // npm install react-bootstrap-icons

const Homepage = () => {
  const navigate = useNavigate();

  const questions = [
    {
      name: "Kaprekar–Like Prime",
      path: "/q1",
      snippet: "Find the next number in the Kaprekar-like prime sequence (n=1000-3000).",
    },
    {
      name: "Repunit Primes",
      path: "/q2",
      snippet: "Check which numbers of form 1N are prime for N between 2 and 1040.",
    },
    {
      name: "Mersenne Primes",
      path: "/q3",
      snippet: "Find primes of form 2^p-1 with p between 2201 and 2299.",
    },
    {
      name: "Primes Between Squares",
      path: "/q4",
      snippet: "Determine at least 4 primes between squares of two large Mersenne primes.",
    },
    {
      name: "Palindromic Prime",
      path: "/q5",
      snippet: "Find a prime palindrome with at least 50 digits.",
    },
    {
      name: "Perfect Numbers",
      path: "/q6",
      snippet: "Compute perfect numbers using Mersenne primes from #3.",
    },
    {
      name: "Goldbach Pairs",
      path: "/q7",
      snippet: "Show two primes that sum to even numbers greater than 50 digits.",
    },
  ];

  return (
    <div className="container my-5">
      <h2 className="text-center mb-5 fw-bold">Prime Numbers Project</h2>
      <div className="row justify-content-center g-4">
        {questions.map((q, index) => (
          <div key={index} className="col-6 col-md-4 d-flex justify-content-center">
            <div className="question-card" onClick={() => navigate(q.path)}>
              <h5 className="fw-bold text-center mb-2">Q{index + 1}</h5>
              <p className="text-center mb-1 fw-bold">{q.name}</p>
              <p className="text-center mb-2 question-snippet">{q.snippet}</p>
              <ArrowRight size={28} />
            </div>
          </div>
        ))}
      </div>

      {/* custom styles */}
      <style jsx="true">{`
        .question-card {
          height: 240px;
          width: 220px;
          border-radius: 25px;
          background: linear-gradient(135deg, #e0f7fa, #ffffff);
          box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
          cursor: pointer;
          transition: all 0.3s ease;
          border: 2px solid #007bff20;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          padding: 10px;
          text-align: center;
        }
        .question-card:hover {
          transform: translateY(-6px) scale(1.05);
          background: linear-gradient(135deg, #d0f0ff, #f8f9fa);
          box-shadow: 0 12px 20px rgba(0, 0, 0, 0.25);
        }
        .question-card h5 {
          color: #212529;
        }
        .question-card p {
          font-size: 13px;
          color: #333;
        }
        .question-snippet {
          font-size: 12px;
          color: #555;
        }
        .question-card svg {
          color: #007bff;
          transition: transform 0.3s ease;
        }
        .question-card:hover svg {
          transform: translateX(6px);
        }
      `}</style>
    </div>
  );
};

export default Homepage;
