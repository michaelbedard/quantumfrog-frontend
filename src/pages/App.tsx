import React, { useEffect, useRef, useState} from 'react';
import logo from '../assets/logo.svg';
import './App.css';

import backgroundworld from './../assets/backgroundworld.jpg';
import UserControls from "../utils/UserControl";
import Level1 from "../levels/Level1";
import StartScreenOverlay from "../components/StartScreenOverlay";

export interface PlayerCoordinates {
    x: number ;
    y: number ;
}

function App() {
    const [backgroundPosition, setBackgroundPosition] = useState<PlayerCoordinates>({x: 0, y: 0});

    return (
        <UserControls backgroundPosition={backgroundPosition} setBackgroundPosition={setBackgroundPosition}>
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
}

export default App;
