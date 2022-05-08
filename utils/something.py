import json
import os
from os import environ

import requests
from pprint import PrettyPrinter
pp = PrettyPrinter()


def getData(id: str):
    #Fetch Movie Data with Full Plot 
    api_key = "INSERTHERE"
    title = id
    data_URL = 'http://www.omdbapi.com/?i='+title+'&apikey='+api_key
    # print(data_URL)
    year = ''
    params = {
        'type':'movie',
        'y':year,
        'plot':'full',
    }
    response = requests.get(data_URL,params=params).json()
    # pp.pprint(response)
    return response

def create_index():
    with open("../data/test_captions.jl", encoding='utf-8') as f:
        for line in f:
            movie_data = json.loads(line)
            imdb_id = movie_data["imdb_id"]
            more_movie_data = getData(imdb_id)
            more_movie_data["content"] = movie_data["content"]

            with open("../data/captions_updated.jl", 'a', encoding='utf-8') as f2:
                f2.write(json.dumps(more_movie_data) + "\n")

create_index()    