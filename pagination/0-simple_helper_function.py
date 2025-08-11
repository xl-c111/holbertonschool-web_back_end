#!/usr/bin/env python3
"""Module for calculating pagination start and end indexes."""


def index_range(page, page_size):
    """Calculate the start and end index for pagination."""
    start = (page - 1) * page_size
    end = start + page_size
    return start, end
