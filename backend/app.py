from flask import Flask, Response, jsonify, request
from flask_cors import CORS
import controllers

app = Flask(__name__)
CORS(app)


# Q1: Kaprekar-like Prime Search
@app.route("/q1")
def q1():
    start = int(request.args.get("start", 1000))
    end = int(request.args.get("end", 3000))
    return Response(controllers.kaprekar_like_prime_stream(start, end), mimetype="text/event-stream")


# Q2: Repunit Primes
@app.route("/q2")
def q2():
    start = int(request.args.get("start", 2))      # default 2
    end = int(request.args.get("end", 1040))       # default 1040
    return jsonify(controllers.repunit_primes(start, end))


# Q3: Mersenne Primes
@app.route("/q3")
def q3():
    start = int(request.args.get("start", 2201))
    end = int(request.args.get("end", 2299))
    return jsonify(controllers.mersenne_primes_in_range(start, end))


# Q4: First N Primes Between Two Mersenne Squares
@app.route("/q4")
def q4():
    p1 = int(request.args.get("p1", 2203))
    p2 = int(request.args.get("p2", 2281))
    count = int(request.args.get("count", 4))
    return jsonify(controllers.primes_between_mersenne_squares(p1, p2, 5))


# Q5: Palindromic Prime
@app.route("/q5")
def q5():
    digits = int(request.args.get("digits", 50)) 
    return jsonify(controllers.palindromic_prime(digits))



# Q6: Perfect Numbers
@app.route("/q6")
def q6():
    p_values = request.args.getlist("p", type=int) or [2203, 2281]
    return jsonify(controllers.perfect_numbers(p_values))


# Q7: Goldbach Pairs
@app.route("/q7")
def q7_route():
    N_str = request.args.get("N")
    if not N_str:
        N_str = str(10**49 + 12)  # default fallback

    try:
        N = int(N_str)
        pair = controllers.goldbach_pair(N)
    except Exception as e:
        pair = None

    return jsonify({
        "number": N_str,
        "pair": pair,
        "runtime_seconds": round(0, 5)  # or calculate actual runtime if needed
    })


if __name__ == "__main__":
    app.run(debug=True, port=5001)
