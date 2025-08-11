#!/usr/bin/env python3
"""
Module for paginating a dataset of popular baby names.

This module defines a Server class that reads a CSV file containing
popular baby names and provides pagination support via the get_page method.
It uses lazy loading to cache the dataset after the first file read.
"""
import csv
import math
from typing import List, Dict, Any

index_range = __import__('0-simple_helper_function').index_range


class Server:
    """Server class to paginate a database of popular baby names.
    """
    DATA_FILE = "Popular_Baby_Names.csv"

    def __init__(self):
        self.__dataset = None

    def dataset(self) -> List[List]:
        """Cached dataset
        """
        if self.__dataset is None:
            with open(self.DATA_FILE) as f:
                reader = csv.reader(f)
                dataset = [row for row in reader]
            self.__dataset = dataset[1:]

        return self.__dataset

    def get_page(self, page: int = 1, page_size: int = 10) -> List[List]:
        """
        Load and cache the dataset from the CSV file if not already loaded.
        """
        assert isinstance(page, int) and isinstance(
            page_size, int), "page and page_size must be integers"
        assert page > 0 and page_size > 0, "page and page_size must be > 0, \
            got{}, {}".format(page, page_size)

        start, end = index_range(page, page_size)
        data = self.dataset()

        if start >= len(data):
            return []
        else:
            return data[start: end]

    def get_hyper(self, page: int = 1, page_size: int = 10) -> Dict[str, Any]:
        """
        Load and cache the dataset from the CSV file if not already loaded.
        """
        assert isinstance(page, int) and isinstance(
            page_size, int), "page and page_size must be integers"
        assert page > 0 and page_size > 0, "page and page_size must be > 0, \
            got{}, {}".format(page, page_size)

        data = self.get_page(page, page_size)
        actual_size = len(data)
        total_items = len(self.dataset())

        if actual_size > 0:
            total_pages = math.ceil(total_items / page_size)
        else:
            total_pages = 0

        if page < total_pages:
            next_page = page + 1
        else:
            next_page = None

        if page > 1:
            prev_page = page - 1
        else:
            prev_page = None

        return {"page_size": actual_size,
                "page": page,
                "data": data,
                "next_page": next_page,
                "prev_page": prev_page,
                "total_pages": total_pages}
