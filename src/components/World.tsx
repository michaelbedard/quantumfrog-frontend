import React, {useEffect, useRef, useState} from "react";
import backgroundworld from "../assets/backgroundworld.jpg";
import door1 from "../assets/door1.png";
import door2 from "../assets/door2.png";
import door3 from "../assets/door3.png";
import door4 from "../assets/door4.png";
import Door from "./Door";

import {Coordinates} from "../pages/App";

interface LevelProps {
    backgroundRef: React.RefObject<HTMLDivElement>;
    backgroundSize: { width: number; height: number };
    coordinate: Coordinates ;
    rotate: number;
    isStoryEnded: boolean;

    setWorldId:  React.Dispatch<React.SetStateAction<number>>;
    clientId: number;
    setRotation:  React.Dispatch<React.SetStateAction<number>>;
    setValue:  React.Dispatch<React.SetStateAction<number>>;

    door1Position: Coordinates;
    door2Position: Coordinates;
    door3Position: Coordinates;
    door4Position: Coordinates;

}

const World: ({props}: { props: LevelProps }) => React.JSX.Element = ({props} : {props : LevelProps}) => {
    const rotationTransform = "rotate("+props.rotate+"deg)"

    return (
        <div
            ref={props.backgroundRef}
             style={{
                 position: "relative",
                 width: "100%",
                 height: "100%",
                 transform: rotationTransform,
             }}
        >
            <img draggable="false" src={backgroundworld} alt={"background"} style={{
                position: "absolute",
                width: "100%",
                height: "100%",
                objectFit: "contain",
            }}/>

            <Door props={{
                backgroundImage : door1,
                x: props.door1Position.x,
                y: props.door1Position.y,
                isLocked: false,
                playerCoordinates: props.coordinate,
                backgroundSize: props.backgroundSize,
                setWorldId: props.setWorldId,
                clientId: props.clientId,
                setRotation: props.setRotation,
                setValue : props.setValue,
                id: 1

            }}/>

            <Door props={{
                backgroundImage : door2,
                x: props.door2Position.x,
                y: props.door2Position.y,
                isLocked: false,
                playerCoordinates: props.coordinate,
                backgroundSize: props.backgroundSize,
                id: 2

            }}/>
            <Door props={{
                backgroundImage : door3,
                x: props.door3Position.x,
                y: props.door3Position.y,
                isLocked: false,
                playerCoordinates: props.coordinate,
                backgroundSize: props.backgroundSize,
                id: 3

            }}/>  
                        <Door props={{
                backgroundImage : door4,
                x: props.door4Position.x,
                y: props.door4Position.y,
                isLocked: false,
                playerCoordinates: props.coordinate,
                backgroundSize: props.backgroundSize,
                id: 4
            }}/>    

        </div>
    )
}

export default World