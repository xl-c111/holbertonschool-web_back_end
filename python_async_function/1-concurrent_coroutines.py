#!/usr/bin/env python3
"""
Module that defines an asynchronous routine for running multiple
coroutines concurrently.
"""
import asyncio
import random
from typing import List

wait_random = __import__('0-basic_async_syntax').wait_random


async def wait_n(n: int, max_delay: int = 10) -> List[float]:
    """
    Spawn `wait_random` n times with the given max_delay and collect
    the results in the order of completion (ascending).
    """
    tasks = []
    for _ in range(n):
        tasks.append(asyncio.create_task(wait_random(max_delay)))

    results = []
    for task in asyncio.as_completed(tasks):
        result = await task
        results.append(result)
    return results
