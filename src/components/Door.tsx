import React, {useEffect} from "react";
import {PlayerCoordinates} from "../pages/App";

interface DoorProps {
    backgroundImage: string;
    PlayerCoordinates : PlayerCoordinates;
    isLocked: boolean;
    x: number;
    y: number;
    backgroundSize: { width: number; height: number };
}

const Door: ({props}: { props: DoorProps }) => React.JSX.Element = ({props} : {props : DoorProps}) => {
    const proximityThreshold = 10;

    useEffect(() => {
        const distance = Math.sqrt(
            Math.pow(props.PlayerCoordinates.x - props.x * props.backgroundSize.width, 2) +
            Math.pow(props.PlayerCoordinates.y - props.y * props.backgroundSize.height, 2)
        );

       // console.log(distance);

        if (distance <= proximityThreshold) {
            if (props.isLocked) {
                console.log("The door is locked. You can't pass!");
            } else {
                console.log("The door is unlocked. You can pass!");
            }
        }
    }, [props.PlayerCoordinates, props.x, props.y, props.isLocked, props.backgroundSize]);

    return (
        <>
            <img draggable="false" src={props.backgroundImage} alt={"door"} style={{
                position: "absolute",
                width: "10%",
                height: "10%",
                top: `${props.y * 100}%`,
                left: `${props.x * 100}%`,
                transform: "translate(-50%, -50%)",
                objectFit: "cover",
            }}/>
        </>
    )
}

export default Door;