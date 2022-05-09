from flask import Flask, request
import json
from es_service.search import make_query

api = Flask(__name__)


@api.route('/results', methods=['GET', 'POST'])
def get_results():
    print(request.data)
    query_text = request.get_json()['query']
<<<<<<< HEAD
    # results = make_query(query_text)
    # print(results)
    results = [
            {
                "title": f"This is the 1st title for query: {request.get_json()['query']}",
                "imdb_url": "https://www.imdb.com/title/tt0007476",
                "year": "1992",
                "rated": "R",
                "genre": "Documentary",
                "plot": "A man (Edison's assistant) takes a pinch of snuff and sneezes. This is one of the earliest Edison films and was the first motion picture to be copyrighted in the United States.",
                "language": "None",
                "country": "United States",
                "poster": "https://m.media-amazon.com/images/M/MV5BNTE0ZmNlMDgtMTY4MS00Y2ViLThiYmYtNTYwMDVkOGU0ZDJjXkEyXkFqcGdeQXVyMjA0MzYwMDY@._V1_SX300.jpg",
                "imdbRating": "5.8",
                "type": "movie"
            },
            {
                "title": f"This is the 2nd title for query: {request.get_json()['query']}",
                "imdb_url": "https://www.imdb.com/title/tt0007476",
                "year": "2000",
                "rated": "R",
                "genre": "Documentary",
                "plot": "A man (Tesla's assistant) takes a pinch of snuff and sneezes. This is one of the earliest Edison films and was the first motion picture to be copyrighted in the United States.",
                "language": "None",
                "country": "United States",
                "poster": "https://m.media-amazon.com/images/M/MV5BNTE0ZmNlMDgtMTY4MS00Y2ViLThiYmYtNTYwMDVkOGU0ZDJjXkEyXkFqcGdeQXVyMjA0MzYwMDY@._V1_SX300.jpg",
                "imdbRating": "5.8",
                "type": "movie"
            }
    ]
=======
    results = make_query(query_text)
>>>>>>> 0733a92024c45be90d34e6fd66ff663ffaeb897f
    return json.dumps(results)
