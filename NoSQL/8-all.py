#!/usr/bin/env python3
"""This module provides a helper function to list all documents
in a MongoDB collection."""


def list_all(mongo_collection):
    """List all documents in the given MongoDB collection."""
    documents = list(mongo_collection.find())
    return documents if documents else []
