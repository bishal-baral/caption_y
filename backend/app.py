from flask import Flask, request
import json

api = Flask(__name__)


@api.route('/results', methods=['GET', 'POST'])
def get_results():
    print(request.data)
    response_body = [
            {
                "title": f"This is the 1st title for query: {request.get_json()['query']}",
                "imdb_url": "https://www.google.com/",
                "description": "This is a description"
            },
            {
                "title": f"This is the 2nd title for query: {request.get_json()['query']}",
                "imdb_url": "https://www.google.com/",
                "description": "This is the second description"
            },
            {
                "title": f"This is the 3rd title for query: {request.get_json()['query']}",
                "imdb_url": "https://www.google.com/",
                "description": "This is the last description"
            }
    ]
    return json.dumps(response_body)
