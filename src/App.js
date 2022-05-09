import { useState } from 'react'
import axios from "axios";
import './App.css';

function App(){
  const [search, setSearch] = useState("")
  const [results, setResults] = useState([]);
  const [isPlot, setIsPlot] = useState(true);
  const [isCaption, setIsCaption] = useState(false);
  const [showDetails, setShowDetails] = useState(new Array(30).fill(false));

  const handleSearch = async e => {
    e.preventDefault();
    if (search === '') return;

    let content_type = ""
    if (isPlot){
      content_type = "plot"
    }
    else if (isCaption){
      content_type = "caption"
    }

    const response = await axios({
      method: "POST",
      url:"/results",
      data: {
        query: search,
        content_type: content_type,
      }
    })
    console.log(response.data);
    setResults(response.data)    
  }

  const handleIsPlot = () => {
    console.log("option1 selected");
    setIsPlot(!isPlot);
    setIsCaption(false);
  };

  const handleIsCaption = () => {
    console.log("option2 selected");
    setIsCaption(!isCaption);
    setIsPlot(false);
  };

  const handleShowDetails = (i) => {
    console.log(i);
    let temp_state = [...showDetails];
    temp_state[i] = !temp_state[i];
    setShowDetails(temp_state);
    console.log(showDetails);
  }

  return (
    <div className="App">
      <header>
        <h1> Caption-Y </h1>
        <form 
          className="search-box"
          onSubmit={handleSearch}
        >
        <div className="search-box-radio">
          <label>
            <input type="radio" checked={isPlot} onChange={handleIsPlot} />
            Plot
          </label>
          <label>
            <input type="radio" checked={isCaption} onChange={handleIsCaption} />
            Caption
          </label>
        </div>
          <input 
            className="search-box-bar"
            type="search" 
            placeholder="What are you looking for?"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </form>
          <p>Search Results: {results.length}</p>
      </header>

      <div className="results">
        {
          results.map((result, i) =>{
            return (
              <div key={"result"+i} className="result">
                <div className="result-img">
                <img src={result.poster} alt="Lamp" width="100" height="100"/>
                </div>
                <div className="result-content">
                  <h3>{result.title}</h3>
                  { showDetails[i] &&
                  <div>
                    <p>Year: {result.year}</p>
                    <p>Rated: {result.rated}</p>
                    <p>Genre: {result.genre}</p>
                    <p>Language: {result.language}</p>
                    <p>Country: {result.country}</p>
                    <p>IMDB Rating: {result.imdbRating}</p>
                    <p>Type: {result.type}</p>
                    <p> Plot: {result.plot}</p>
                  </div>
                  }
                  
                  <a onClick={() => handleShowDetails(i)} className="result-readMore" >{showDetails[i] ? "Hide" : "Show" } Details</a>
                  {showDetails[i] &&
                  <a href={result.imdb_url} className="result-viewImdb" target="_blank" rel="nofollow"> View on IMDB </a>}
                </div>
                
              </div>
            )
          })
        }
      </div>
    </div>
  );
}

export default App;
