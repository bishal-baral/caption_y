# Ali Yuksekkaya, Khadija Tirmazi

from flask import Flask, request
import json
from es_service.search import make_query

api = Flask(__name__)


@api.route('/results', methods=['GET', 'POST'])
def get_results():
    data = json.loads(request.data.decode())
    query = data['query']
    content_type = data['content_type']
    media_type = data['media_type']

    results = make_query(query, content_type, media_type)
    return json.dumps(results)
