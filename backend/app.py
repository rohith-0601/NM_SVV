from flask import Flask, Response, jsonify
from flask_cors import CORS
import controllers

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

@app.route("/q1")
def q1():
    return Response(controllers.kaprekar_like_prime_stream(), mimetype="text/event-stream")

@app.route("/q2")
def q2():
    return jsonify(controllers.repunit_primes())

@app.route("/q3")
def q3():
    return jsonify(controllers.mersenne_primes_in_range())

@app.route("/q4")
def q4():
    return jsonify(controllers.primes_between_mersenne_squares())

@app.route("/q5")
def q5():
    return jsonify(controllers.palindromic_prime())

@app.route("/q6")
def q6():
    return jsonify(controllers.perfect_numbers())

@app.route("/q7")
def q7():
    return jsonify(controllers.goldbach_pairs())


if __name__ == "__main__":
    app.run(debug=True, port=5001)
