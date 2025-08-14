#!/usr/bin/env python3
"""This module provides a function to retrieve all school documents
that have a specified topic in their 'topics' field."""


def schools_by_topic(mongo_collection, topic):
    """
    Retrieve a list of schools that include the specified topic.

    Args:
        mongo_collection (pymongo.collection.Collection):
            The MongoDB collection object representing schools.
        topic (str):
            The topic to search for within the 'topics' array field
            of each document.

    Returns:
        list:
            A list of matching school documents. Each document is a dict
            containing all its fields.

    Notes:
        - The 'topics' field is expected to be an array in each document.
        - This function performs an exact match on the topic value.
        - If no documents match, an empty list is returned.
    """
    return list(mongo_collection.find({
        "topics": topic
    }))
