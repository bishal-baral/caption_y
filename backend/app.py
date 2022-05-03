from flask import Flask, request

api = Flask(__name__)

@api.route('/message')
def my_profile():
    response_body = {
        "message": "Hello World!",
    }
    return response_body

@api.route('/results', methods=['GET', 'POST'])
def get_results():
    print(request.data)
    response_body = {
        "results" : request.get_json()["query"]
    }
    return response_body
