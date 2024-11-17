import React, { useEffect, useRef, useState} from 'react';
import frog from '../assets/frog.png';
import './App.css';
import UserControls from "../utils/UserControl";
import World from "../components/World";
import StartScreenOverlay from "../components/StartScreenOverlay";
import useRotation from '../hooks/useRotation';
import useStoryEnded from '../hooks/useStoryEnded';
import LaBarre from '../components/LaBarre';
import {registerUser} from "../services/NetworkService";


export interface Coordinates {
    x: number ;
    y: number ;
}

export interface UserData {
    id: number;
    state: number[];
    angle: number;
}

function App() {
    const [clientId, setClientId] = useState<number>(0);
    const [playerCoordinates, setPlayerCoordinates] = useState<Coordinates>({x: 0, y: 0});
    const [backgroundPosition, setBackgroundPosition] = useState<{x: number, y:number}>({x: 0, y: 0});
    const [backgroundSize, setBackgroundSize] = useState({ width: 0, height: 0 });
    const backgroundRef = useRef<HTMLDivElement>(null);
    const [rotation] = useRotation();
    const [isStoryEnded, setIsStoryEnded] = useStoryEnded();


    const valueLaBarre = -0.2;

    // register user
    useEffect(() => {
        const register = async () => {
            const userData = await registerUser();
            const parsedData = JSON.parse(userData) as UserData;

            setClientId(userData.id)
        };

        register();
    }, []);

    // listen to background size change
    useEffect(() => {
        const updateBackgroundSize = () => {
            if (backgroundRef.current) {
                const { offsetWidth, offsetHeight } = backgroundRef.current;
                setBackgroundSize({ width: offsetWidth, height: offsetHeight });
            }
        };

        updateBackgroundSize();
        window.addEventListener("resize", updateBackgroundSize);
        return () => window.removeEventListener("resize", updateBackgroundSize);
    }, []);

    // set initial position based on window height and width
    useEffect(() => {
        if (backgroundSize.width && backgroundSize.height) {
            const centerX = (window.innerWidth - backgroundSize.width) / 2;
            const centerY = (window.innerHeight - backgroundSize.height) / 2;
            setBackgroundPosition({ x: centerX, y: centerY });
        }
    }, [backgroundSize]);

    return (
        <>
            <UserControls setPlayerCoordinates={setPlayerCoordinates} setBackgroundPosition={setBackgroundPosition} Style={{height:'100%'}}>
                <div className="App" id={isStoryEnded ? "background" : "black"} draggable="false" style={{outline: 'none', backgroundColor: 'black'}}>
                    <div draggable="false">
                        <header draggable="false"
                                style={{
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    width: '100%',
                                    zIndex: 10,
                                    textAlign: 'center',
                                }}>
                                    <p style={{fontWeight: 'bold', fontSize: '24px'}}>
                                        WORLD
                                    </p>
                                    <LaBarre props={{value:valueLaBarre}}/>
                        </header>

                        <StartScreenOverlay isStoryEnded={isStoryEnded} setIsStoryEnded={setIsStoryEnded}>
                            <div draggable="false"
                                 style={{
                                     position: "absolute",
                                     top: `${backgroundPosition.y}px`,
                                     left: `${backgroundPosition.x}px`,
                                     width: "300vw",
                                     height: "300vh",
                                     overflow: "hidden",
                                 }}
                            >
                                <World props={{coordinate: playerCoordinates, backgroundSize: backgroundSize, backgroundRef: backgroundRef, rotate: rotation}} />
                            </div>
                        </StartScreenOverlay>

                        <div
                            draggable="false"
                            style={{
                                position: "absolute",
                                top: "50%",
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

            <div style={{position: 'absolute', top: "50%", left: "50%", transform: "translate(-50%, -50%)", zIndex: 100}}>
                <div id="portal-root"></div>
            </div>
        </>
    )
}

export default App;
