from flask import Flask, request
import json
from es_service.search import make_query

api = Flask(__name__)


@api.route('/results', methods=['GET', 'POST'])
def get_results():
    print(request.data)
    response_body = make_query(request.get_json()['query'])
    return json.dumps(response_body)
