#!/usr/bin/env python3
"""Provides a function to insert a new document into a MongoDB collection
using flexible keyword arguments (**kwargs)."""


def insert_school(mongo_collection, **kwargs):
    """
    Insert a new document into the specified MongoDB collection.
    Args:
        mongo_collection(pymongo.collection.Collection):
            The MongoDB collection where the document will be inserted.
        **kwargs: unpack keyword arguments into a dict, representing the
            document field and their values.

    Return:
        ObjectId: the _id of newly inserted document.

    Notes:
        - `**kwargs` is collected as a dictionary and passed directly to
          `insert_one()`.
        - The returned `ObjectId` is accessible from the InsertOneResult
          object via its `.inserted_id` attribute.

    """

    result = mongo_collection.insert_one(kwargs)
    return result.inserted_id
