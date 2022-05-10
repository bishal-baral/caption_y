# Caption-Y

### Setting up
***Don't skip these steps even if you have already installed them!***
- run ```pip install flask```
- run ```pip install elasticsearch_dsl```
- run ```pip install python-dotenv```

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
- to run the backend server with npm, run ```npm run start-backend``` on a separate terminal window
- to run the react server, ```npm run start```  

***Note: To run the app fully. You will need to be running the elasticsearch server, flask server (npm run start-backend), and the react server (npm run start). Then go to ```localhost:5000``` to interact with the app.***

- to run just the backend run ```env/bin/flask run --no-debugger```

