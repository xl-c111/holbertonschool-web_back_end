#!/usr/bin/env python3
def update_topics(mongo_collection, name, topics):
    if not name or not isinstance(name, str):
        raise ValueError("name must be a non-empty string.")
    if not isinstance(topics, list):
        raise ValueError("Topics must be a list.")

    return mongo_collection.update_many(
        {"name": name},
        {"$set": {"topics": topics}}
    )
