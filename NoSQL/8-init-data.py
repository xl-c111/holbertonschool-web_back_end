#!/usr/bin/env python3
from pymongo import MongoClient

client = MongoClient('mongodb://127.0.0.1:27017')
collection = client.my_db.school

# Force insert by first clearing old data
collection.delete_many({})

collection.insert_many([
    {"name": "Holberton school"},
    {"name": "UCSD"}
])

print("✅ Inserted test data.")
