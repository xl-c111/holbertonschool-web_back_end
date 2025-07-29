#!/usr/bin/env python3
"""
This module provides a higher-order function that returns a multiplier
function. Useful for creating customized mathematical operations like
doubling, tripling, etc.
"""
from typing import Callable


# Callable that takes a single float argument and returns a float
def make_multiplier(multiplier: float) -> Callable[[float], float]:
    """Returns a function that multiplies its input by the
    given multiplier."""
    def multiply(n: float) -> float:
        return n * multiplier
    return multiply


# Syntax: Callable[[...], ...] with double brackets
"""
represents a callable(function) that takes one argument of type ...
returns a value of type of ...
"""
