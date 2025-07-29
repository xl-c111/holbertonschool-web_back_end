#!/usr/bin/env python3
"""
Module that defines an asynchronous routine for launching multiple
scheduled tasks concurrently using asyncio.as_completed.
"""
import asyncio
import random
from typing import List


task_wait_random = __import__('3-tasks').task_wait_random


async def task_wait_n(n: int, max_delay: int = 10) -> List[float]:
    """
    Run task_wait_random n times concurrently and return a list of results
    in the order of completion using asyncio.as_completed.
    """
    tasks = []
    for _ in range(n):
        tasks.append(task_wait_random(max_delay))

    results = []
    for task in asyncio.as_completed(tasks):
        result = await task
        results.append(result)
    return results
