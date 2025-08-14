#!/usr/bin/env python3
"""his module provides a function to update the 'topics' field for one or more
documents in a MongoDB collection based on the given 'name' filter.
"""


def update_topics(mongo_collection, name, topics):
    """
    Update the 'topics' field for all documents in the collection that match
    the specified 'name'.

    Args:
        mongo_collection (pymongo.collection.Collection):
            The MongoDB collection object where the update will be performed.
        name (str):
            The value of the 'name' field to match in the documents.
        topics (list):
            A list of topics to set in the matched documents. This will replace
            the existing 'topics' field.

    Raises:
        ValueError: If 'name' is not a non-empty string.
        ValueError: If 'topics' is not a list.

    Returns:
        pymongo.results.UpdateResult:
            The result of the update operation, which includes information
            such as the number of matched and modified documents.

    Notes:
        - This function uses the '$set' operator to replace the 'topics' field.
        - All documents with the matching 'name' will be updated.
        - If no documents match the filter, no updates will be made.
    """
    if not name or not isinstance(name, str):
        raise ValueError("name must be a non-empty string.")
    if not isinstance(topics, list):
        raise ValueError("Topics must be a list.")

    return mongo_collection.update_many(
        {"name": name},
        {"$set": {"topics": topics}}
    )
