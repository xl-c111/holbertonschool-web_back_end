#!/usr/bin/env python3
"""
Deletion-resilient hypermedia pagination
"""

import csv
import math
from typing import List, Dict, Any


class Server:
    """Server class to paginate a database of popular baby names.
    """
    DATA_FILE = "Popular_Baby_Names.csv"

    def __init__(self):
        self.__dataset = None
        self.__indexed_dataset = None

    # loads the CSV file as plain list
    def dataset(self) -> List[List]:
        """
        Cached dataset
        Return:
            a list of lists
            outer list: contains all data rows in the file
            inner list: a single row from the CSV, with each column value
                        stored as a str
        """
        if self.__dataset is None:
            with open(self.DATA_FILE) as f:
                reader = csv.reader(f)
                dataset = [row for row in reader]
            self.__dataset = dataset[1:]

        return self.__dataset

    # converts the plain list into a dict with row numbers as keys
    def indexed_dataset(self) -> Dict[int, List]:
        """
        Dataset indexed by sorting position, starting at 0
        return:
            a dict where keys are row numbers, values are data rows

        """
        if self.__indexed_dataset is None:
            dataset = self.dataset()
            truncated_dataset = dataset[:1000]
            self.__indexed_dataset = {
                # mapping a dict of {row_index: row_data}
                i: dataset[i] for i in range(len(dataset))
            }
        return self.__indexed_dataset

    def get_hyper_index(self, index: int = None, page_size: int = 10) \
            -> Dict[str, Any]:
        """
        Get hypermedia pagination information
        """
        assert isinstance(
            index, int) and index >= 0, "Index must be a non-negative integer"
        assert isinstance(
            page_size, int) and page_size > 0, "Page size must be a \
                positive integer"

        # get indexed data dict
        indexed = self.indexed_dataset()
        # if dataset is empty
        if not indexed:
            return {
                "index": index,
                "data": [],
                "page_size": 0,
                "next_index": index
            }

        max_index = max(indexed.keys())
        # index represents the current start index of return page
        assert index <= max_index, "Index out of range"

        # initialize an empty list to collect rows
        data = []
        # track where we are
        current_index = index

        # len(data) < page_size keeps looping until we get enough rows for the current page
        # current_index <= max_index ensures we don't fetch beyond the lest available index
        while len(data) < page_size and current_index <= max_index:
            # check whether current_index still exists in the dataset
            if current_index in indexed:
                # add actual row of data from dataset into list data, which stores all rows for the current page
                data.append(indexed[current_index])
            # move to the next row whether current_row was valid or not
            current_index += 1

        return {
            "index": index,
            "data": data,
            "page_size": len(data),
            "next_index": current_index
        }
