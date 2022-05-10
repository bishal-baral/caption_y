// Bishal Baral

import { useState } from 'react'
import axios from "axios";
import './App.css';

function App(){
  const [search, setSearch] = useState("")
  const [results, setResults] = useState([]);
  const [isMovie, setIsMovie] = useState(false);
  const [isSeries, setIsSeries] = useState(false);
  const [isBoth, setIsBoth] = useState(true);
  const [isPlot, setIsPlot] = useState(true);
  const [isCaption, setIsCaption] = useState(false);
  const [showDetails, setShowDetails] = useState(new Array(30).fill(false));
  const [currentPage, setCurrentPage] = useState(0)
  const RESULTS_PER_PAGE = 10

  const handleSearch = async e => {
    e.preventDefault();
    if (search === '') return;

    let content_type = ""
    let media_type = ""

    if (isPlot){
      content_type = "plot"
    }
    else if (isCaption){
      content_type = "caption"
    }

    if (isMovie){
      media_type = "movie"
    }
    else if (isSeries){
      media_type = "series"
    }
    else if (isBoth){
      media_type = "both"
    }


    const response = await axios({
      method: "POST",
      url:"/results",
      data: {
        query: search,
        content_type: content_type,
        media_type: media_type
      }
    })
    console.log(response.data);
    setResults(response.data);
    setShowDetails(new Array(30).fill(false))
    setCurrentPage(0)
  }

  const handleIsPlot = () => {
    setIsPlot(!isPlot);
    setIsCaption(false);
  };

  const handleIsCaption = () => {
    setIsCaption(!isCaption);
    setIsPlot(false);
  };

  const handleIsMovie = () => {
    setIsMovie(!isMovie);
    setIsSeries(false);
    setIsBoth(false);
  };

  const handleIsSeries = () => {
    setIsSeries(!isSeries);
    setIsMovie(false);
    setIsBoth(false);
  };

  const handleIsBoth = () => {
    setIsBoth(!isBoth);
    setIsMovie(false);
    setIsSeries(false);
  };

  const handleShowDetails = (i) => {
    console.log(i);
    let temp_state = [...showDetails];
    temp_state[i] = !temp_state[i];
    setShowDetails(temp_state);
    console.log(showDetails);
  }

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
    setShowDetails(new Array(30).fill(false));
  }
  const handlePreviousPage = () => {
    setCurrentPage(currentPage - 1);
    setShowDetails(new Array(30).fill(false));
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
            <input type="radio" checked={isMovie} onChange={handleIsMovie} />
            Movie
          </label>
          <label>
            <input type="radio" checked={isSeries} onChange={handleIsSeries} />
            Series
          </label>
          <label>
            <input type="radio" checked={isBoth} onChange={handleIsBoth} />
            Both
          </label>
        </div>

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
        { results.length !== 0 &&
          <div className="search-results">
            <p >Search Results: {results.length}</p>
            <p >Page: {currentPage+1} / {Math.ceil(results.length / RESULTS_PER_PAGE)}  </p>
          </div>
        }

         

      </header>
      { results.length !== 0 &&
        <div className="results">
          <div className="changePage">
            <div>
              { (currentPage !== 0) && 
                <a href="#" onClick={handlePreviousPage} className="result-prev" >Previous Page</a>
              }
            </div>

            <div>
              { (currentPage < (results.length/ RESULTS_PER_PAGE) - 1) && 
                <a href="#" onClick={handleNextPage} className="result-next" >Next Page</a>
              }
            </div>
          </div>

          {
            results.slice((currentPage*RESULTS_PER_PAGE), ((currentPage + 1) * RESULTS_PER_PAGE)).map((result, i) =>{
              return (
                <div key={"result"+i} className="result">
                  <div className="result-img">
                  { (result.poster !== "N/A") ?
                  <img src={result.poster} alt={result.title} width={showDetails[i] ? "200" : "100"} height={showDetails[i] ? "200" : "100"}/> :
                  <img src="https://www.budget101.com/images/image-not-available.png?6068" alt={result.title} width={showDetails[i] ? "200" : "100"} height={showDetails[i] ? "200" : "100"}/> 
                  }
                  </div>
                  <div className="result-content">
                    <h3>{result.title}</h3>
                    { showDetails[i] &&
                    <div>
                      <p><b>Year:</b> {result.year}</p>
                      <p><b>Rated:</b> {result.rated}</p>
                      <p><b>Genre:</b> {result.genre}</p>
                      <p><b>Language:</b> {result.language}</p>
                      <p><b>Country:</b> {result.country}</p>
                      <p><b>IMDB Rating:</b> {result.imdbRating}</p>
                      <p><b>Type:</b> {result.type}</p>
                      <p><b>Plot:</b> {result.plot}</p>
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

          <div className="changePage">
            <div>
              { (currentPage !== 0) && 
                <a href="#" onClick={handlePreviousPage} className="result-prev" >Previous Page</a>
              }
            </div>

            <div>
              { (currentPage < (results.length/ RESULTS_PER_PAGE) - 1) && 
                <a href="#" onClick={handleNextPage} className="result-next" >Next Page</a>
              }
            </div>
          </div>

        </div>
      } 
    </div>
  );
}

export default App;
