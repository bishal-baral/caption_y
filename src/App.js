import { useState } from 'react'
import axios from "axios";
import logo from './logo.svg';
import './App.css';

function App() {

  const [messages, setMessages] = useState(null)

  function getData() {
    axios({
      method: "GET",
      url:"/message",
    })
    .then((response) => {
      const res =response.data
      console.log(res);
      setMessages(({
        message: res.message}))
    }).catch((error) => {
      if (error.response) {
        console.log(error.response)
        console.log(error.response.status)
        console.log(error.response.headers)
        }
    })}

  return (
    <div className="App">
      <header className="App-header">
        
        <p>To get your profile details: </p><button onClick={getData}>Click me</button>
        {
          messages && 
          <div>
            <p>Message: {messages.message}</p>
          </div>
        }
      </header>
    </div>
  );
}

export default App;