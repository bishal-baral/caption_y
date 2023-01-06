# Caption-Y

### Description
A search engine for finding movies and TV shows. Users can enter queries and get results. Queries can be lines from movies or things that have been said in the movie (not necessarily quotes) or descriptions of the plot. 

### Preparing data
- Go into ```/data/readme.txt``` and download the data. Extract the data into ```/data```.
- run elasticsearch and run ```build.py```

##### Building the test index:
- in ```search.py``` 
    - set ```SEARCH_INDEX_NAME = "test_movies" ```
- in ```build.py```
    - set ```SEARCH_INDEX_NAME = "test_movies"``` and ```DATA_PATH = "../../data/example_processed_data.jl"```

### Starting the app:
- run ```npm install```
- cd into the backend directory and
  1.  For Mac/Unix users run:
        - ```python3 -m venv env```
        - ```source env/bin/activate```
  2. For Windows User run:
        - ```py -m venv env```
        - ```.\env\Scripts\activate```

### Setting up
***Don't skip these steps even if you have already installed them!***
- run ```pip install flask```
- run ```pip install elasticsearch_dsl```
- run ```pip install python-dotenv```

- to run the backend server with npm, run ```npm run start-backend``` on a separate terminal window
- to run the react server, ```npm run start```  

***Note: To run the app fully. You will need to be running the elasticsearch server, flask server (npm run start-backend), and the react server (npm run start). Then go to ```localhost:5000``` to interact with the app.***

- to run just the backend run ```env/bin/flask run --no-debugger```

### Run instructions

The system can be used to search for shows, movies, or both. The user can choose to search for things that have been said in the media or a general plot of the media. Returned results display 
numerous information about the media content, such as “rating”, “title”, “language” etc. The results also contain a link to the IMDB website of the media content. The user can use the link to get more detailed information about the media if they so desire. 


### Testing

The system was tested using a small set of the corpus and using 50 movies and shows. We tried searching for lines that are on purpose a bit incorrect to see if the engine would still return the desired result. We also used perfectly correct lines. We used the plot functionality in the same manner. 

For example, for the index built using example_processed_data.jl,  when we searched for the following, the results we got were what we expected. If the results were not found on the first page, it was mostly available at least in the next two pages. 

#### Query 
“we should call judgment”, using caption search, from the “Edison Kinetoscopic Record of Sneeze” was the first result.

#### Query
“in love with Buckingham Duke”, using Plot Search, looking for The Three Musketeers returns it as the first result.
