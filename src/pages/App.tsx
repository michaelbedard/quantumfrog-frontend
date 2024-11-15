import React, {useEffect, useState} from 'react';
import logo from '../assets/logo.svg';
import './App.css';
import axios from "axios";

function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    axios
        .get('https://jsonplaceholder.typicode.com/posts/1')
        .then((response) => {
          console.log(response.data); // Log the response
          setData(response.data); // Update state with data
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
        });
  }, []);

  return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.tsx</code> and save to reload!
          </p>
          <a
              className="App-link"
              href="https://reactjs.org"
              target="_blank"
              rel="noopener noreferrer"
          >
            Learn React
          </a>
          <div>
            <h2>Fetched Data:</h2>
            {data ? <pre>{JSON.stringify(data, null, 2)}</pre> : <p>Loading...</p>}
          </div>
        </header>
      </div>
  );
}

export default App;
