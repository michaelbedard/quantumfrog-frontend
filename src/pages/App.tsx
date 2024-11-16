import React, { useEffect, useRef, useState} from 'react';
import logo from '../assets/logo.svg';
import './App.css';

import backgroundworld from './../assets/backgroundworld.jpg';
import UserControls from "../utils/UserControl";



function App() {
    const [backgroundPosition, setBackgroundPosition] = useState<{x: number; y: number}>({ x: 0, y: 0 });


    return (
          <UserControls backgroundPosition={backgroundPosition} setBackgroundPosition = {setBackgroundPosition}>
              <div className="App" draggable="false" style={{outline: 'none', backgroundColor: 'lightblue'}}>
                  <div draggable="false">
                      <header draggable="false"
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

                      <div draggable="false"
                           style={{
                               position: "absolute",
                               top: `${backgroundPosition.y}px`,
                               left: `${backgroundPosition.x}px`,
                               width: "200vw",
                               height: "200vh",
                               overflow: "hidden",
                           }}
                      >
                          <img draggable="false" src={backgroundworld} alt={"background"} style={{
                              width: "100%",
                              height: "100%",
                              objectFit: "cover",
                          }}/>
                      </div>
                      <div
                          draggable="false"
                          style={{
                              position: "absolute",
                              top: "50%",
                              left: "50%",
                              transform: "translate(-50%, -50%)",
                          }}
                      >
                          <img draggable="false" src={logo} className="App-logo" alt="logo"/>
                      </div>
                  </div>
              </div>
          </UserControls>
      );


=======
import useMousePosition from '../_misc/hooks/useMousePosition';
import StartScreenOverlay from "../components/StartScreenOverlay";
import Level1 from "../levels/Level1";

export interface PlayerCoordinates {
    x: number ;
    y: number ;
}

function App() {

    const [backgroundPosition, setBackgroundPosition] = useState< {x: number; y: number}>({ x: 0, y: 0 });
    const [mousePosition, setMousePosition] = useMousePosition();

    const screenwidth : number = window.innerWidth;
    const screenheight : number = window.innerHeight;
    const centerCoord : {x: number, y:number} = {x : screenwidth/2,  y: screenheight/2};


    const mouseCoord : {x: number, y:number} = {x: mousePosition.x - centerCoord.x,y: mousePosition.y - centerCoord.y}
    const isMoving : boolean = true

    // console.log(mouseCoord.x, mouseCoord.y, isMoving);

    useEffect(() => {
        const updateMousePosition = (ev : MouseEvent) => {
          setMousePosition({ x: ev.clientX, y: ev.clientY });
        };
        
        window.addEventListener('mousemove', updateMousePosition);
    
        return () => {
          window.removeEventListener('mousemove', updateMousePosition);
        };
      }, []);



        const movement = 10;
        if(isMoving) {
            const angle : number = Math.atan(mouseCoord.y/mouseCoord.x) - Math.PI/2
            // console.log(angle)
        }
      

        const handleMouseDown = () => {
            
        }
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
      <div className="App" onKeyDown={handleKeyDown} tabIndex={0} style={{ outline: 'none', backgroundColor: 'black' }}>
          <div>
              {/*<header*/}
              {/*    style={{*/}
              {/*        position: 'absolute',*/}
              {/*        top: 0,*/}
              {/*        left: 0,*/}
              {/*        width: '100%',*/}
              {/*        backgroundColor: 'rgba(255, 255, 255, 0.8)', // Optional for readability*/}
              {/*        zIndex: 10, // Ensures header is above the background*/}
              {/*        textAlign: 'center', // Optional for centering text*/}
              {/*    }}>*/}
              {/*    Qubit 000 + 111*/}
              {/*</header>*/}

              <StartScreenOverlay>
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
                      <Level1 props={{Coordinate: backgroundPosition}}/>

                  </div>
              </StartScreenOverlay>

              Fixed character
              <div
                  style={{
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                  }}
              >
                  <img src={logo} className="App-logo" alt="logo"/>
              </div>
          </div>
      </div>
  );
}

export default App;
