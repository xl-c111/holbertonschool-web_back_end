#!/usr/bin/env python3
"""Module that provides a function to create and schedule a task
for the wait_random coroutine using asyncio."""
import asyncio
from typing import Coroutine

wait_random = __import__('0-basic_async_syntax').wait_random


def task_wait_random(max_delay: int = 10) -> asyncio.Task:
    """Create and return an asyncio.Task that runs wait_random(max_delay)."""
    return asyncio.create_task(wait_random(max_delay))
