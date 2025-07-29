#!/usr/bin/env python3
"""
This module defines an asynchronous generator function that yields
random float numbers between 0 and 10, with a 1-second delay between each.
"""
import asyncio
import random
from typing import Generator


async def async_generator() -> Generator[float, None, None]:
    """
    Asynchronously generate 10 random float numbers between 0 and 10.
    """
    for _ in range(10):
        await asyncio.sleep(1)
        yield random.uniform(0, 10)
