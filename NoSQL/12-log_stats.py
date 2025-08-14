#!/usr/bin/env python3
"""
Print basic stats about Nginx logs stored in MongoDB.

Database: logs
Collection: nginx

Output format (exact):
<total> logs
Methods:
    method GET: <n_get>
    method POST: <n_post>
    method PUT: <n_put>
    method PATCH: <n_patch>
    method DELETE: <n_delete>
<status_count> status check
"""
from pymongo import MongoClient


def main() -> None:
    """
    Connects to the local MongoDB 'logs' database and retrieves statistics
    from the 'nginx' collection. Specifically:
      - Counts the total number of documents in the collection.
      - Counts the number of documents for each HTTP method (GET, POST, PUT,
        PATCH, DELETE).
      - Counts the number of GET requests to the '/status' endpoint.
    Prints these statistics to the console in a formatted manner.
    """
    # Connect to local MongoDB default instance
    client = MongoClient('mongodb://127.0.0.1:27017')
    # Get a handle to collection nginx in database logs
    collection = client.logs.nginx

    # count all documents in the collection
    total = collection.count_documents({})

    # list with fixed order
    methods = ["GET", "POST", "PUT", "PATCH", "DELETE"]

    method_counts = {
        # build a dict that key is the HTTP method str,
        # value is the integer count of documents where method == <that method>
        m: collection.count_documents({'method': m})
        # iterate through list methods
        for m in methods
    }

    status_count = collection.count_documents({
        "method": "GET",
        "path": "/status"
    })

    print("{} logs".format(total))
    print("Methods:")
    for m in methods:
        print("\tmethod {}: {}".format(m, method_counts[m]))
    print("{} status check".format(status_count))


if __name__ == "__main__":
    main()
