#!/usr/bin/env python3
"""
This module defines a utility function that takes an iterable of sequence-like
objects and returns a list of tuples, where each tuple contains the element and
its length.
"""
from typing import Iterable, Sequence, List, Tuple


def element_length(lst: Iterable[Sequence]) -> List[Tuple[Sequence, int]]:
    """
    Takes an iterable of sequence-like objects and returns a list of tuples,
    where each tuple contains the element and its length.
    """
    return [(i, len(i)) for i in lst]
