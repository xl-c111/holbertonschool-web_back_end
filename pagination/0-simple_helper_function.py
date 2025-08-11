#!/usr/bin/env python3
"""Module for calculating pagination start and end indexes."""
from typing import Tuple


def index_range(page: int, page_size: int) -> Tuple[int, int]:
    """Calculate the start and end index for pagination."""
    start = (page - 1) * page_size
    end = start + page_size
    return start, end
