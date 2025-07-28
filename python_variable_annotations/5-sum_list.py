#!/usr/bin/env python3
"""
This module defines a function `sum_list` that calculates the sum of
a list of floating-point numbers and returns the result as a float.
"""
from typing import List


def sum_list(input_list: List[float]) -> float:
    """ Returns the sum of a list of floating-point numbers."""
    return sum(input_list)
