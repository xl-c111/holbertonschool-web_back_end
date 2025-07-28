#!/usr/bin/env python3
"""
This module defines a function `to_kv` that takes a string and a numeric value,
and returns a tuple where the first element is the string, and the second
element is the square of the numeric value (as a float).
"""
from typing import Union, Tuple


def to_kv(k: str, v: Union[int, float]) -> Tuple[str, float]:
    """Creates a tuple containing a string and the square of a number."""
    return (k, float(v**2))
