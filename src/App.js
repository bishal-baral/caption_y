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
  }
  const handlePreviousPage = () => {
    setCurrentPage(currentPage - 1);
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
                <a href="#" onClick={handlePreviousPage} className="result-viewImdb" >Previous Page</a>
              }
            </div>

            <div>
              { (currentPage < (results.length/ RESULTS_PER_PAGE) - 1) && 
                <a href="#" onClick={handleNextPage} className="result-viewImdb" >Next Page</a>
              }
            </div>
          </div>

          {
            results.slice((currentPage*RESULTS_PER_PAGE), ((currentPage + 1) * RESULTS_PER_PAGE)).map((result, i) =>{
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

          <div className="changePage">
            <div>
              { (currentPage !== 0) && 
                <a href="#" onClick={handlePreviousPage} className="result-viewImdb" >Previous Page</a>
              }
            </div>

            <div>
              { (currentPage < (results.length/ RESULTS_PER_PAGE) - 1) && 
                <a href="#" onClick={handleNextPage} className="result-viewImdb" >Next Page</a>
              }
            </div>
          </div>

        </div>
      } 
    </div>
  );
}

export default App;
