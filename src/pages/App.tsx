import React, { useEffect, useRef, useState} from 'react';
import frog from '../assets/frog.png';
import './App.css';

import UserControls from "../utils/UserControl";
import Level1 from "../levels/Level1";
import StartScreenOverlay from "../components/StartScreenOverlay";

export interface PlayerCoordinates {
    x: number ;
    y: number ;
}

function App() {
    const [backgroundPosition, setBackgroundPosition] = useState<PlayerCoordinates>({x: 0, y: 0});

    useEffect(() => {
        console.log(backgroundPosition.x)
    }, [backgroundPosition]);

    return (
        <UserControls backgroundPosition={backgroundPosition} setBackgroundPosition={setBackgroundPosition} Style={{height:'100%'}}>
            <div className="App" draggable="false" style={{outline: 'none', backgroundColor: 'black'}}>
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

                    <div
                        draggable="false"
                        style={{
                            position: "absolute",
                            top: "80%",
                            left: "50%",
                            transform: "translate(-50%, -50%)",
                            zIndex: 10,
                        }}
                    >
                        <img draggable="false" src={frog} className="App-logo" alt="logo"/>
                    </div>
                </div>
            </div>
        </UserControls>
    );
}

export default App;
