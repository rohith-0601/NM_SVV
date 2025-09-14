import time
import gmpy2
from gmpy2 import mpz, next_prime, is_prime
from sympy import isprime, primerange, nextprime
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

def kaprekar_like_prime_stream(start=1000, end=3000):
    start_time = time.time()
    for n in range(start, end + 1):
        candidate = kaprekar_number(n)
        elapsed = round(time.time() - start_time, 2)
        yield f"data: {{\"current_n\": {n}, \"runtime_seconds\": {elapsed}}}\n\n"
        if gmpy2.is_prime(candidate):
            yield f"data: {{\"found\": true, \"n\": {n}, \"kaprekar_number\": \"{candidate}\", \"runtime_seconds\": {elapsed}}}\n\n"
            break


# -------- Q2: Repunit Primes --------
def repunit_primes(start=2, end=1040):
    results = []
    start_time = time.time()
    for n in primerange(start, end + 1):
        num = (10**n - 1) // 9
        if isprime(num):
            results.append({"n": n, "repunit": str(num)})
    elapsed = round(time.time() - start_time, 2)
    return {"repunit_primes": results, "runtime_seconds": elapsed}

# -------- Q3: Mersenne Primes --------
def mersenne_primes_in_range(start=2200, end=2300):
    start_time = time.time()
    results = []
    for p in primerange(start, end + 1):
        M = 2**p - 1
        if isprime(M):
            results.append({"p": p, "mersenne_number": str(M)})
    elapsed = round(time.time() - start_time, 2)
    return {"mersenne_primes": results, "runtime_seconds": elapsed}


# -------- Q4: First N Primes Between Two Mersenne Squares --------
def primes_between_mersenne_squares(p1=2203, p2=2281, count=5):
    start_time = time.time()
    M_n1 = (2) ** p1 - 1
    M_n2 = (2) ** p2 - 1
    primes = []
    num = next_prime(mpz(M_n1) ** 2)
    while num < mpz(M_n2) ** 2 and len(primes) < count:
        primes.append(str(num))
        num = next_prime(num)
    elapsed = round(time.time() - start_time, 2)
    return {"primes": primes, "runtime_seconds": elapsed}


# -------- Q5: Palindromic Prime --------
def generate_palindrome(length):
    """Generate odd-length palindromes of a given length."""
    half = (length + 1) // 2
    start = 10 ** (half - 1)
    end = 10 ** half
    for i in range(start, end):
        s = str(i)
        pal = s + s[-2::-1]  # odd-length palindrome
        yield mpz(pal)

def palindromic_prime(min_digits=50, max_digits=55):
    """
    Try to find a palindromic prime between min_digits and max_digits.
    If not found, return None.
    """
    start_time = time.time()
    length = min_digits if min_digits % 2 == 1 else min_digits + 1
    while length <= max_digits:
        for pal in generate_palindrome(length):
            if is_prime(pal):
                elapsed = round(time.time() - start_time, 2)
                return {
                    "palindromic_prime": str(pal),
                    "digits": len(str(pal)),
                    "runtime_seconds": elapsed
                }
        length += 2  # try next odd length
    # If no palindromic prime found
    elapsed = round(time.time() - start_time, 2)
    return {
        "palindromic_prime": None,
        "digits": None,
        "runtime_seconds": elapsed,
        "message": f"No palindromic prime found for {min_digits}-{max_digits} digits"
    }

# -------- Q6: Perfect Numbers from Mersenne Primes --------
def perfect_numbers(p_values=[2203, 2281]):
    start_time = time.time()
    perfect_numbers = []
    for p in p_values:
        M_p = mpz(2) ** p - 1
        N = (1 << (p - 1)) * M_p
        perfect_numbers.append({"p": p, "perfect_number": str(N)})
    elapsed = round(time.time() - start_time, 2)
    return {"perfect_numbers": perfect_numbers, "runtime_seconds": elapsed}


# -------- Q7: Goldbach’s Conjecture --------
from sympy import isprime, nextprime
import time

def goldbach_pair(N: int):
    """Return two primes whose sum is N."""
    if N <= 2 or N % 2 != 0:
        return None
    p = 2
    while p <= N // 2:
        q = N - p
        if isprime(p) and isprime(q):
            return [str(p), str(q)]  # always return as strings
        if p == 2:
            p = 3
        else:
            p = nextprime(p)
    return None

def goldbach_pairs(N_values):
    """Accepts list of numbers (as strings) and returns Goldbach pairs."""
    start_time = time.time()
    pairs = []
    for N_str in N_values:
        try:
            N = int(N_str)
            pair = goldbach_pair(N)
        except Exception as e:
            print(f"Error with {N_str}: {e}")  # debug
            pair = None
        pairs.append(pair)
    elapsed = round(time.time() - start_time, 5)
    return {
        "numbers": N_values,
        "pairs": pairs,
        "runtime_seconds": elapsed
    }
