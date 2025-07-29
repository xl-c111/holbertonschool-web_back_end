#!/usr/bin/env python3
"""
Module that provides asynchronous delay utilities using asyncio and random.
This module defines an asynchronous coroutine that waits for a random delay
between 0 and a specified maximum number of seconds.
"""
import random
import asyncio


async def wait_random(max_delay: int = 10) -> float:
    """
    Wait for a random delay between 0 and max_delay seconds (inclusive)
    and return the actual delay.
    """
    delay = random.uniform(0, max_delay)
    await asyncio.sleep(delay)
    return delay
