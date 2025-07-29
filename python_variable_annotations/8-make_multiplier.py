#!/usr/bin/env python3
"""
This module provides a higher-order function that returns a multiplier
function. Useful for creating customized mathematical operations like
doubling, tripling, etc.
"""
from typing import Callable


def make_multiplier(multiplier: float) -> Callable[[float], float]:
    """Returns a function that multiplies its input by the
    given multiplier."""
    def multiply(n: float) -> float:
        return n * multiplier
    return multiply
