import { useState } from 'react'
import axios from "axios";
import logo from './logo.svg';
import './App.css';
import SearchBar from './components/SearchBar';

// function App() {

//   const [messages, setMessages] = useState(null)

//   function getData() {
//     axios({
//       method: "GET",
//       url:"/message",
//     })
//     .then((response) => {
//       const res =response.data
//       console.log(res);
//       setMessages(({
//         message: res.message}))
//     }).catch((error) => {
//       if (error.response) {
//         console.log(error.response)
//         console.log(error.response.status)
//         console.log(error.response.headers)
//         }
//     })}

//   return (
//     <div className="App">
//       <header className="App-header">
        
//         <p>To get your profile details: </p><button onClick={getData}>Click me</button>
//         {
//           messages && 
//           <div>
//             <p>Message: {messages.message}</p>
//           </div>
//         }
//       </header>
//     </div>
//   );
// }

// const App = () => (
//   <SearchBar />
// );

function App(){
  const [search, setSearch] = userState("")
  const [results, setResults] = useState([]);
  const [searchInfo, setSearchInfo] = useState([]);

  return (
    <div className="App">
      <header>
        <h1> Captiony </h1>
        <form className="search-box">
          <input type="search" placeholder="What are you looking for?"/>
        </form>
          <p>Search Results: 0</p>
      </header>

      <div className="results">
        <div className="result">
          <h3> Title goes here</h3>
          <p> lorem ipsum dolor sit amet, consectetur lorem ipsum dolor sit amet lorem ipsum dolor sit am</p>
          <a href="#"> Read More </a>
        </div>
      </div>
    </div>
  );
}

export default App;
