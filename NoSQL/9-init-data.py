#!/usr/bin/env python3
"""
Initialize `my_db.school` with test data if empty.
"""

from pymongo import MongoClient


def init_data():
    # Connect to MongoDB
    client = MongoClient("mongodb://127.0.0.1:27017")
    collection = client.my_db.school

    # Check if collection is empty
    if collection.count_documents({}) == 0:
        print("Inserting test data into my_db.school...")
        collection.insert_many([
            {"name": "Holberton school"},
            {"name": "UCSD"}
        ])
    else:
        print("my_db.school already has data, skipping insertion.")

    # Show all documents
    for doc in collection.find():
        print("[{}] {}".format(doc.get("_id"), doc.get("name")))


if __name__ == "__main__":
    init_data()
