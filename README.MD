To start the app:

- run 'npm install'

- cd into the backend directory and
  1. 
    - For mac/unix users: python3 -m venv env
    - For windows users: py -m venv env
  2.
    - For mac/unix users: 'source env/bin/activate'
    - For windows users: '.\env\Scripts\activate'

- Don't skip these steps even if you have already installed them!
- run 'pip install flask'
- run 'pip install elasticsearch_dsl'
- run 'pip install python-dotenv'

- Go into /data/readme.txt and download the data. Extract the data into /data.
- run elasticsearch and run 'build.py'


- to run the backend server with npm, run 'npm run start-backend' on a separate terminal window
- to run the react server, 'npm run start'  

- Note: To run the app fully. You will need to be running the elasticsearch server, flask server (npm run start-backend), and the react
- server (npm run start). Then go to localhost:5000 to interact with the app. 

- to run just the backend run 'env/bin/flask run --no-debugger'


