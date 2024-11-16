import React, {useState} from 'react';
import logo from '../assets/logo.svg';
import './App.css';
import backgroundworld from './../assets/backgroundworld.jpg';
import CustomButton from "../components/CustomButton";

function App() {

    const [backgroundPosition, setBackgroundPosition] = useState({ x: 0, y: 0 });

    const handleKeyDown = (e : any) => {
        const movement = 10;

        console.log(e.key)

        switch (e.key) {
            case "ArrowUp":
                setBackgroundPosition((prev) => ({ ...prev, y: prev.y + movement }));
                break;
            case "ArrowDown":
                setBackgroundPosition((prev) => ({ ...prev, y: prev.y - movement }));
                break;
            case "ArrowLeft":
                setBackgroundPosition((prev) => ({ ...prev, x: prev.x + movement }));
                break;
            case "ArrowRight":
                setBackgroundPosition((prev) => ({ ...prev, x: prev.x - movement }));
                break;
            default:
                break;
        }
    };

  return (
      <div className="App" onKeyDown={handleKeyDown} tabIndex={0} style={{ outline: 'none', backgroundColor: 'lightblue'  }}>
          <div>
              <header
                  style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      backgroundColor: 'rgba(255, 255, 255, 0.8)', // Optional for readability
                      zIndex: 10, // Ensures header is above the background
                      textAlign: 'center', // Optional for centering text
                  }}>
                  Qubit 000 + 111
              </header>
              <div>

              </div>
               Moving background
              <div
                  style={{
                      position: "absolute",
                      top: `${backgroundPosition.y}px`,
                      left: `${backgroundPosition.x}px`,
                      width: "200vw",
                      height: "200vh",
                      overflow: "hidden",
                  }}
              >
                  <img src={backgroundworld} alt={"background"} style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                  }}/>
              </div>
               Fixed character
              <div
                  style={{
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                  }}
              >
                  <img src={logo} className="App-logo" alt="logo" />
              </div>
          </div>
      </div>
  );
}

export default App;
