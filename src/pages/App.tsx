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
import ReactDOM from "react-dom";
import InformationCard from "../components/InformationCard";


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
    const [rotation, setRotation] = useRotation();
    const [isStoryEnded, setIsStoryEnded] = useStoryEnded();
    const [showInformationCard, setShowInformationCard] = useState(false);
    const [worldId, setWorldId] = useState(0);
    const [valueLaBarre, setValueLaBarre] = useState(0);

    // register user
    useEffect(() => {
        const register = async () => {
            const userData = await registerUser();
            const parsedData = JSON.parse(userData) as UserData;

            console.log(parsedData)

            setClientId(parsedData.id)
        };

        console.log("Register!!!")
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

    const onclick = () => {
        if (!isStoryEnded){
            return;
        }

        setShowInformationCard(true)
    }

    // Portal rendering logic
    const renderInformationCard = () => {
        if (showInformationCard) {
            return ReactDOM.createPortal(
                <InformationCard
                    title="WOLD "
                    description="XXX"
                    buttonLabel="Got it!"
                    onButtonClick={() => setShowInformationCard(false)} // Close the card
                />,
                document.getElementById("portal-root") as HTMLElement
            );
        }
        return null;
    };

    

    return (
        <>
            <UserControls isStoryEnded={isStoryEnded} setPlayerCoordinates={setPlayerCoordinates} setBackgroundPosition={setBackgroundPosition} Style={{height:'100%'}}>
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
                            <div onClick={onclick} style={{
                                display: isStoryEnded ? "flex" : "none",
                                cursor: isStoryEnded ? "pointer" : "default",
                                transition: "opacity 0.3s ease",
                                justifyContent: "center", // Center content horizontally
                                alignItems: "center", // Center content vertically (optional)
                            }}>
                                <p style={{fontWeight: 'bold', fontSize: '24px'}}>
                                    WORLD
                                </p>
                            </div>
                            <LaBarre props={{value: valueLaBarre, isStoryEnded: isStoryEnded}}/>
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

                                {renderWorld(worldId)}

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

                {renderInformationCard()}

            </UserControls>

            <div style={{position: 'absolute', top: "50%", left: "50%", transform: "translate(-50%, -50%)", zIndex: 100}}>
                <div id="portal-root"></div>
            </div>
        </>
    )

    function renderWorld(worldId : number) {
        const worldConfig = getWorldConfig(worldId); // Get the configuration for the current world
        return (
            <World props={{
                coordinate: playerCoordinates,
                backgroundSize: backgroundSize,
                backgroundRef: backgroundRef,
                rotate: rotation,
                isStoryEnded: isStoryEnded,
                door1Position: worldConfig.door1Position,
                door2Position: worldConfig.door2Position,
                door3Position: worldConfig.door3Position,
                door4Position: worldConfig.door4Position,
                
            }} />
        );
    }
    
    // Example: Function to return world configuration based on worldId
    function getWorldConfig(worldId : number) {
        const worldData: { [key: number]: any} = {
            0: { 
                door1Position: { x: 0.23, y: 0.77 }, 
                door2Position: { x: 0.61, y: 0.21 }, 
                door3Position: { x: 0.81, y: 0.74 },
                door4Position: { x: 0.11, y: 0.35 } 
            },
            1: { 
                door1Position: { x: 0.45, y: 0.1 }, 
                door2Position: { x: 0.72, y: 0.31 }, 
                door3Position: { x: 0.92, y: 0.67 },
                door4Position: { x: 0.16, y: 0.82 }  
            },
            2: { 
                door1Position: { x: 0.33, y: 0.46 }, 
                door2Position: { x: 0.77, y: 0.36 }, 
                door3Position: { x: 0.95, y: 0.13 },
                door4Position: { x: 0.21, y: 0.92 }
            },
            3: { 
                door1Position: { x: 0.86, y: 0.14 }, 
                door2Position: { x: 0.63, y: 0.72 }, 
                door3Position: { x: 0.87, y: 0.29 },
                door4Position: { x: 0.12, y: 0.54 }
            },
            4: { 
                door1Position: { x: 0.64, y: 0.84 }, 
                door2Position: { x: 0.53, y: 0.91 }, 
                door3Position: { x: 0.73, y: 0.67 },
                door4Position: { x: 0.18, y: 0.29 }  
            },
            5: { 
                door1Position: { x: 0.12, y: 0.51 }, 
                door2Position: { x: 0.29, y: 0.77 }, 
                door3Position: { x: 0.65, y: 0.53 },
                door4Position: { x: 0.78, y: 0.18 }  
            },
            6: { 
                door1Position: { x: 0.63, y: 0.23 }, 
                door2Position: { x: 0.71, y: 0.48 }, 
                door3Position: { x: 0.85, y: 0.92 },
                door4Position: { x: 0.25, y: 0.67 } 
            },
            7: { 
                door1Position: { x: 0.93, y: 0.12 }, 
                door2Position: { x: 0.38, y: 0.61 }, 
                door3Position: { x: 0.79, y: 0.24 },
                door4Position: { x: 0.52, y: 0.79 } 
            },
        };
        
        
        return worldData[worldId] || worldData[0];
    }
}

export default App;
