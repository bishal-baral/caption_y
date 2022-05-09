from flask import Flask, request
import json
from es_service.search import make_query

api = Flask(__name__)


@api.route('/results', methods=['GET', 'POST'])
def get_results():
    print(request.data)
    query_text = request.get_json()['query']
    results = make_query(query_text)
    return json.dumps(results)
