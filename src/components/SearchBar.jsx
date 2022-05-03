import "./SearchBar.css";
import axios from "axios";
import { useState } from 'react'



const SearchBar = () => {
    const [results, setResults] = useState(null)
    const [query, setQuery] = useState("")

    const getResults = () => 
        axios({
                  method: "POST",
                  url:"/results",
                  data: {
                    query: query,
                  }
                })
                .then((response) => {
                  const res =response.data
                  console.log(res);
                  setResults(({
                    results: res.results}))
                }).catch((error) => {
                  if (error.response) {
                    console.log(error.response)
                    console.log(error.response.status)
                    console.log(error.response.headers)
                    }
                })

    return (
      <>
    <div>
        <div class="bar">
            <input class="searchbar" type="text" onChange={(e) => {setQuery(e.target.value)}} title="Search"></input>
        </div>
        <div class="buttons">
            <button class="button" type="button" onClick={getResults}>Search</button>
        </div>
    </div>
    { results &&
    <div>
        <p>Response: {results.results}</p>
    </div>
    }
      </>
    );
  };
  
  export default SearchBar;
  