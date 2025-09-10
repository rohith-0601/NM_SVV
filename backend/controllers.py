import time
import gmpy2
from gmpy2 import mpz, next_prime, is_prime
from sympy import isprime, primerange, nextprime

# Increase digit handling for very large numbers
import sys
sys.set_int_max_str_digits(20000)


# -------- Q1: Kaprekar-like Prime Search --------
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
        yield f"data: {{\"current_n\": {n}, \"runtime_seconds\": {elapsed}}}\n\n"
        if gmpy2.is_prime(candidate):
            yield f"data: {{\"found\": true, \"n\": {n}, \"kaprekar_number\": \"{candidate}\", \"runtime_seconds\": {elapsed}}}\n\n"
            break


# -------- Q2: Repunit Primes --------
def repunit_primes(limit=1040):
    start_time = time.time()
    results = []
    for n in primerange(2, limit + 1):
        num = (10**n - 1) // 9
        if isprime(num):
            results.append({"n": n, "repunit": str(num)})
    elapsed = round(time.time() - start_time, 2)
    return {"repunit_primes": results, "runtime_seconds": elapsed}


# -------- Q3: Mersenne Primes --------
def mersenne_primes_in_range(start=2201, end=2299):
    start_time = time.time()
    results = []
    for p in primerange(start, end + 1):
        M = 2**p - 1
        if isprime(M):
            results.append({"p": p, "mersenne_number": str(M)})
    elapsed = round(time.time() - start_time, 2)
    return {"mersenne_primes": results, "runtime_seconds": elapsed}


# -------- Q4: First 4 Primes Between Two Mersenne Squares --------
def primes_between_mersenne_squares():
    start_time = time.time()
    M_n1 = (2) ** 2203 - 1
    M_n2 = (2) ** 2281 - 1
    primes = []
    num = next_prime(mpz(M_n1) ** 2)
    while num < mpz(M_n2) ** 2 and len(primes) < 4:
        primes.append(str(num))
        num = next_prime(num)
    elapsed = round(time.time() - start_time, 2)
    return {"primes": primes, "runtime_seconds": elapsed}


# -------- Q5: Palindromic Prime (50+ digits) --------
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
                return {"palindromic_prime": str(pal), "digits": len(str(pal)), "runtime_seconds": elapsed}
        length += 2


# -------- Q6: Perfect Numbers from Mersenne Primes --------
def perfect_numbers():
    start_time = time.time()
    mersennes = [
        {"p": 2203, "mersenne_number": str(mpz(2)**2203 - 1)},
        {"p": 2281, "mersenne_number": str(mpz(2)**2281 - 1)}
    ]
    perfect_numbers = []
    for item in mersennes:
        p = item["p"]
        M_p = mpz(item["mersenne_number"])
        N = (1 << (p - 1)) * M_p
        perfect_numbers.append({"p": p, "perfect_number": str(N)})
    elapsed = round(time.time() - start_time, 2)
    return {"perfect_numbers": perfect_numbers, "runtime_seconds": elapsed}


# -------- Q7: Goldbach’s Conjecture (50-digit Evens) --------
def goldbach_pairs():
    start_time = time.time()

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

    elapsed = round(time.time() - start_time, 2)
    return {
        "numbers": [str(N1), str(N2)],
        "pairs": [[str(pair1[0]), str(pair1[1])], [str(pair2[0]), str(pair2[1])]],
        "runtime_seconds": elapsed
    }
