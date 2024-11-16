import React, { useEffect, useRef, useState} from 'react';
import logo from '../assets/logo.svg';
import './App.css';
import backgroundworld from './../assets/backgroundworld.jpg';
import useMousePosition from '../_misc/hooks/useMousePosition';
import useMouseDown from '../_misc/hooks/useMouseDown';



function App() {

    const [backgroundPosition, setBackgroundPosition] = useState< {x: number; y: number}>({ x: 0, y: 0 });
    const [mousePosition, setMousePosition] = useMousePosition();
    const [mouseDown, setMouseDown] = useMouseDown();
    const movement = 3;
    const screenwidth : number = window.innerWidth;
    const screenheight : number = window.innerHeight;
    const centerCoord : {x: number, y:number} = {x : screenwidth/2,  y: screenheight/2};
    const mouseCoord : {x: number, y:number} = {x: mousePosition.x - centerCoord.x,y: centerCoord.y - mousePosition.y}

    const lastMoveTime = useRef(0);
    const animationFrameId = useRef<number | null>(null);
    const isMouseDown = useRef(false); 


    useEffect(() => {
        const updateMousePosition = (ev : MouseEvent) => {
          setMousePosition({ x: ev.clientX, y: ev.clientY });
        };
        
        window.addEventListener('mousemove', updateMousePosition);
    
        return () => {
          window.removeEventListener('mousemove', updateMousePosition);
        };
      }, []);



    const handleMouseUp = (e: any) => {
        setMouseDown(false);
        isMouseDown.current = false;
        cancelAnimationFrame(animationFrameId.current!)
    }
    
    const handleMouseDown = (e: any) => {
        setMouseDown(true);
        isMouseDown.current = true;
    }



    useEffect(() => {
    // Only move the background when mouseDown is true
    if (mouseDown) {
      const moveBackground = (timestamp: number) => {
        const timeElapsed = timestamp - lastMoveTime.current;

        if (timeElapsed > 16) { // Throttle to ~60 FPS (16ms per frame)
          let angle: number = Math.acos(-mouseCoord.x / Math.sqrt(mouseCoord.x ** 2 + mouseCoord.y ** 2));
          if (mouseCoord.y < 0) {
            angle = -angle;
          }

          const xMove = Math.cos(angle) * movement;
          const yMove = Math.sin(angle) * movement;

          setBackgroundPosition((prev) => ({ x: prev.x + xMove, y: prev.y + yMove }));
          lastMoveTime.current = timestamp;
        }

        if (mouseDown) {
            animationFrameId.current = requestAnimationFrame(moveBackground);
        }
      };
      animationFrameId.current = requestAnimationFrame(moveBackground);
    } else {
        if (animationFrameId.current !== null) {
          cancelAnimationFrame(animationFrameId.current);
          animationFrameId.current = null;
        }
      }

      return () => {
        if (animationFrameId.current !== null) {
          cancelAnimationFrame(animationFrameId.current);
        }
      };
  }, [mouseDown, mousePosition]); // Re-run when mouseDown or mouseCoord changes



  return (
      <div className="App"  draggable="false" onMouseDown={handleMouseDown} onMouseUp={handleMouseUp} tabIndex={0} style={{ outline: 'none', backgroundColor: 'lightblue'  }}>
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
                  <img  draggable="false" src={logo} className="App-logo" alt="logo" />
              </div>
          </div>
      </div>
  );


  





}

export default App;
