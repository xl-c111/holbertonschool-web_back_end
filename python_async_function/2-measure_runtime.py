#!/usr/bin/env python3
"""Module to measure the average runtime of wait_n coroutine calls."""
import asyncio
import random
import time

wait_n = __import__('1-concurrent_coroutines').wait_n


def measure_time(n: int, max_delay: int = 10) -> float:
    """Measure the total runtime of wait_n(n, max_delay), and return
    the average execution time per coroutine."""
    start = time.perf_counter()
    asyncio.run(wait_n(n, max_delay))
    end = time.perf_counter()
    total_time = end - start
    return total_time / n
