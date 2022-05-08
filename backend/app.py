from flask import Flask, request
from es_service import test
import json
from es_service.search import make_query

api = Flask(__name__)


@api.route('/results', methods=['GET', 'POST'])
def get_results():
    print(request.data)
    query_text = request.get_json()['query']
    results = test.make_query(query_text)
    # print(results)
    # response_body = [
    #         {
    #             "title": f"This is the 1st title for query: {request.get_json()['query']}",
    #             "imdb_url": "https://www.google.com/",
    #             "description": "This is a description"
    #         },
    #         {
    #             "title": f"This is the 2nd title for query: {request.get_json()['query']}",
    #             "imdb_url": "https://www.google.com/",
    #             "description": "This is the second description"
    #         },
    #         {
    #             "title": f"This is the 3rd title for query: {request.get_json()['query']}",
    #             "imdb_url": "https://www.google.com/",
    #             "description": "This is the last description"
    #         }
    # ]
    return json.dumps(results)
