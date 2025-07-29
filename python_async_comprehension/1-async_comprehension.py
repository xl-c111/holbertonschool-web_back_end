#!/usr/bin/env python3
"""This module imports an asynchronous generator and uses an async
comprehension to collect 10 random float numbers into a list."""
import asyncio
import random
from typing import List

async_generator = __import__('0-async_generator').async_generator


async def async_comprehension() -> List[float]:
    """Asynchronously collect 10 random float numbers from async_generator."""
    result = [value async for value in async_generator()]
    return result
