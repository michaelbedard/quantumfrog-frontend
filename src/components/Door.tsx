import React, {useEffect, useRef, useState} from "react";
import {Coordinates} from "../pages/App";
import InformationCard from "./InformationCard";
import ReactDOM from "react-dom";

interface DoorProps {
    backgroundImage: string;
    playerCoordinates : Coordinates;
    isLocked: boolean;
    x: number;
    y: number;
    backgroundSize: { width: number; height: number };
}

const Door: ({props}: { props: DoorProps }) => React.JSX.Element = ({props} : {props : DoorProps}) => {
    const [doorCoordinates, setDoorCoordinates] = useState({x: 0, y: 0});
    const [showInformationCard, setShowInformationCard] = useState(false);
    const proximityThreshold = 50;

    // set door position
    useEffect(() => {
        const xCoordinate = props.backgroundSize.width/2 - props.x * props.backgroundSize.width;
        const yCoordinate = props.backgroundSize.height/2 - props.y * props.backgroundSize.height;
        setDoorCoordinates({x: xCoordinate, y: yCoordinate});
    }, [props.backgroundSize, props.x, props.y]);

    // check if we should open door
    useEffect(() => {
        const distance = Math.sqrt(
            Math.pow(doorCoordinates.x - props.playerCoordinates.x, 2) +
            Math.pow(doorCoordinates.y - props.playerCoordinates.y, 2)
        );
        if (distance <= proximityThreshold) {
            if (props.isLocked) {
                console.log("The door is locked. You can't pass!");
                setShowInformationCard(false);
            } else {
                console.log("The door is unlocked. You can pass!");
                if (!showInformationCard) {
                    setShowInformationCard(true);
                }
            }
        } else {
            setShowInformationCard(false); // Hide card if player moves away
        }
    }, [props.playerCoordinates, props.x, props.y, props.isLocked, props.backgroundSize]);

    // Portal rendering logic
    const renderInformationCard = () => {
        if (showInformationCard) {
            console.log("The door is unlocked. You can pass!");

            return ReactDOM.createPortal(
                <InformationCard
                    title="Z door"
                    description="You have successfully unlocked the door. You can proceed."
                    buttonLabel="Enter"
                    onButtonClick={() => setShowInformationCard(false)} // Close the card
                />,
                document.getElementById("portal-root") as HTMLElement
            );
        }
        return null;
    };

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
            {renderInformationCard()}
        </>
    )
}

export default Door;