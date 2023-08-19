from os import environ
from flask import Flask, request, jsonify
from requests import get
from src.reader.csv import csv_reader
from src.redis_client.redis_config import RedisConfig
from src.redis_client.redis_client import RedisClient
from src.trancaction_reference import to_transaction_reference

# from src.trancaction_reference.validator import Validator
import time

app = Flask(__name__)

REDIS_CONFIG = RedisConfig(environ["REDIS_HOST"], environ["REDIS_PORT"])


@app.route("/api/flushdB/", methods=["GET"])
def flushdb():
    """for testing and demo purpose"""
    client = RedisClient(REDIS_CONFIG)
    client.flushdb()


@app.route("/api/process_file/", methods=["POST"])
def process_file():
    file = request.files["file"]
    if not file:
        return "error no file given"

    reader = csv_reader(file)
    records = []
    client = RedisClient(REDIS_CONFIG)
    for row in reader:
        schema = to_transaction_reference(row)
        validated = Validator(client, schema)
        # TODO: decide if we return everything or just the errors.
        # if validated.is_invalid()
        records.append(validated)

    time.sleep(10)
    return jsonify({"response": records})


@app.route("/app/", defaults={"path": "index.html"})
@app.route("/app/<path:path>")
def getApp(path):
    return app.send_static_file(path)
