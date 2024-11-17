import React, {useEffect, useRef, useState} from "react";
import backgroundworld from "../assets/backgroundworld.jpg";
import door1 from "../assets/door1.png";
import door2 from "../assets/door2.png";
import door3 from "../assets/door3.png";
import Door from "../components/Door";

import {Coordinates} from "../pages/App";

interface LevelProps {
    backgroundRef: React.RefObject<HTMLDivElement>;
    backgroundSize: { width: number; height: number };
    coordinate: Coordinates ;
}

const Level1: ({props}: { props: LevelProps }) => React.JSX.Element = ({props} : {props : LevelProps}) => {






    const rotationTransform = "rotate("+props.Rotate+"deg)"

    return (
        <div
            ref={props.backgroundRef}
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
                x: 0.60,
                y: 0.60,
                isLocked: false,

                playerCoordinates: props.coordinate,
                backgroundSize: props.backgroundSize
            }}/>

            {/*<Door props={{*/}
            {/*    backgroundImage : door2,*/}
            {/*    x: 0.8,*/}
            {/*    y: 0.2,*/}
            {/*    isLocked: false,*/}
            {/*    PlayerCoordinates: props.Coordinate,*/}
            {/*    backgroundSize*/}
            {/*}}/>*/}

            {/*<Door props={{*/}
            {/*    backgroundImage : door3,*/}
            {/*    x: 0.7,*/}
            {/*    y: 0.7,*/}
            {/*    isLocked: false,*/}
            {/*    PlayerCoordinates: props.Coordinate,*/}
            {/*    backgroundSize*/}
            {/*}}/>*/}
        </div>
    )
}

export default Level1