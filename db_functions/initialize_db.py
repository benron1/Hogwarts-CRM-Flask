from pymongo import MongoClient

client = MongoClient('mongodb://localhost:27017')

db = client["Hogwarts"]

# db.students.insert_one({"name": "Ben"})

