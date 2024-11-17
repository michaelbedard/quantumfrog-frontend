import React, {useEffect, useRef, useState} from "react";
import backgroundworld from "../assets/backgroundworld.jpg";
import door1 from "../assets/door1.png";
import door2 from "../assets/door2.png";
import door3 from "../assets/door3.png";
import Door from "../components/Door";
import {PlayerCoordinates} from "../pages/App";
import { isStringLiteral } from "typescript";

interface LevelProps {
    Coordinate: PlayerCoordinates ;
    Rotate: number;
}

const Level1: ({props}: { props: LevelProps }) => React.JSX.Element = ({props} : {props : LevelProps}) => {
    const backgroundRef = useRef<HTMLDivElement>(null);
    const [backgroundSize, setBackgroundSize] = useState({ width: 0, height: 0 });

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

    useEffect(() => {
        //console.log(props.Coordinate)
    }, [props.Coordinate.x]);






    const rotationTransform = "rotate("+props.Rotate+"deg)"

    return (
        <div
            ref={backgroundRef}
             style={{
                 position: "relative",
                 width: "100%",
                 height: "100%",
                 overflow: "hidden",
                 transform: rotationTransform,
                 border: "10px solid pink"

             }}
        >
            
            
            <img draggable="false" src={backgroundworld} alt={"background"} style={{
                position: "absolute",
                width: "100%",
                height: "100%",
                objectFit: "cover",

            }}/>

            <Door props={{
                backgroundImage : door1,
                x: 0.2,
                y: 0.7,
                isLocked: false,
                PlayerCoordinates: props.Coordinate,
                backgroundSize,
            }}/>

            <Door props={{
                backgroundImage : door2,
                x: 0.8,
                y: 0.2,
                isLocked: false,
                PlayerCoordinates: props.Coordinate,
                backgroundSize,

            }}/>

            <Door props={{
                backgroundImage : door3,
                x: 0.7,
                y: 0.7,
                isLocked: false,
                PlayerCoordinates: props.Coordinate,
                backgroundSize,

            }}/>
        </div>
    )
}

export default Level1