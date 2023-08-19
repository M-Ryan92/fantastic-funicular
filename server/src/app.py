from os import environ
from flask import Flask, request, jsonify
from src.reader.csv import csv_reader
from src.redis_client.redis_config import RedisConfig
from src.redis_client.redis_client import RedisClient
from src.trancaction_reference import to_transaction_reference
from src.trancaction_reference.validator import Validator
from requests import get

app = Flask(__name__)

IS_DEV = environ["FLASK_ENV"] == "development"
WEBPACK_DEV_SERVER_HOST = environ["WEBPACK_DEV_SERVER_HOST"]
REDIS_CONFIG = RedisConfig(environ["REDIS_HOST"], environ["REDIS_PORT"])


def proxy(host, path):
    response = get(f"{host}{path}")
    excluded_headers = [
        "content-encoding",
        "content-length",
        "transfer-encoding",
        "connection",
    ]
    headers = {
        name: value
        for name, value in response.raw.headers.items()
        if name.lower() not in excluded_headers
    }
    return (response.content, response.status_code, headers)


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
        records.append(validated.to_dict())

    # time.sleep(10)
    return jsonify({"response": records})


@app.route("/app/", defaults={"path": "index.html"})
@app.route("/app/<path:path>")
def getApp(path):
    if IS_DEV:
        return proxy(WEBPACK_DEV_SERVER_HOST, request.path)
    return app.send_static_file(path)
