#!/usr/bin/env python3
"""
This module defines a coroutine that measures the total execution time
for running the `async_comprehension` coroutine 4 times concurrently
using `asyncio.gather`.
"""
import asyncio
import time


async_comprehension = __import__('1-async_comprehension').async_comprehension


async def measure_runtime() -> float:
    """
    Measure the total runtime of running async_comprehension 4 times
    concurrently.
    """
    start = time.perf_counter()
    results = await asyncio.gather(
        async_comprehension(),
        async_comprehension(),
        async_comprehension(),
        async_comprehension()
    )
    end = time.perf_counter()
    total_time = end - start

    return total_time
