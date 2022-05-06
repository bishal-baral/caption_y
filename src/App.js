import { useState } from 'react'
import axios from "axios";
import './App.css';

function App(){
  const [search, setSearch] = useState("")
  const [results, setResults] = useState([]);

  const handleSearch = async e => {
    e.preventDefault();
    if (search === '') return;
    const response = await axios({
      method: "POST",
      url:"/results",
      data: {
        query: search,
      }
    })
    console.log(response.data);
    setResults(response.data)    
  }

  return (
    
    <div className="App">
      <header>
        <h1> Captiony </h1>
        <form 
          className="search-box"
          onSubmit={handleSearch}
        >
          <input 
            type="search" 
            placeholder="What are you looking for?"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </form>
          <p>Search Results: 0</p>
      </header>

      <div className="results">
        {
          results.map((result, i) =>{
            return (
              <div key={"result"+i} className="result">
                <h3>{result.title}</h3>
                <p> {result.description}</p>
                <a href={result.imdb_url} target="_blank" rel="nofollow"> View on IMDB </a>
              </div>
            )
          })
        }
      </div>
    </div>
  );
}

export default App;
