import json
import os
from os import environ

import requests
from pprint import PrettyPrinter
pp = PrettyPrinter()


def getData(id: str):
    # Fetch Movie Data with Full Plot
    api_key = "INSERTHERE"
    title = id
    data_URL = 'http://www.omdbapi.com/?i='+title+'&apikey='+api_key
    # print(data_URL)
    params = {
        'plot': 'full'
    }
    response = requests.get(data_URL, params=params).json()
    # pp.pprint(response)
    return response


def create_index():
    with open("../data/captions.jl", encoding='utf-8') as f:
        for line in f:
            present_movie_data = json.loads(line)
            imdb_id = present_movie_data["imdb_id"]
            try:
                more_movie_data = getData(imdb_id)
                data = {
                    "title": present_movie_data["title"],
                    "content": present_movie_data["content"],
                    "imdb_url": present_movie_data["imdb_url"],
                    "imdb_id": more_movie_data["imdbID"],
                    "year": more_movie_data['Year'],
                    "rated ": more_movie_data['Rated'],
                    "genre": more_movie_data['Genre'],
                    "plot": more_movie_data['Plot'],
                    "language": more_movie_data['Language'],
                    "country": more_movie_data['Country'],
                    "poster": more_movie_data['Poster'],
                    "imdbRating": more_movie_data['imdbRating'],
                    "type": more_movie_data['Type']
                }

                with open("../data/captions_updated.jl", 'a', encoding='utf-8') as f2:
                    f2.write(json.dumps(data) + "\n")
            except:
                print("skipping", imdb_id)


create_index()
