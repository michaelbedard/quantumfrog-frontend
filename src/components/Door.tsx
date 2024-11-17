import React, {useEffect, useRef, useState} from "react";
import {Coordinates, UserData} from "../pages/App";
import InformationCard from "./InformationCard";
import ReactDOM from "react-dom";
import {getBracket, getProbability, traverseGate} from "../services/NetworkService";

interface DoorProps {
    backgroundImage: string;
    playerCoordinates : Coordinates;
    isLocked: boolean;
    x: number;
    y: number;
    backgroundSize: { width: number; height: number };
    setWorldId:  React.Dispatch<React.SetStateAction<number>>;
    clientId: number;
    setRotation:  React.Dispatch<React.SetStateAction<number>>;
    setValue:  React.Dispatch<React.SetStateAction<number>>;
}

const Door: ({props}: { props: DoorProps }) => React.JSX.Element = ({props} : {props : DoorProps}) => {
    const [doorCoordinates, setDoorCoordinates] = useState({x: 0, y: 0});
    const [showInformationCard, setShowInformationCard] = useState(false);
    const [isLookingAtDoor, setIsLookingAtDoor] = useState(false);
    const proximityThreshold = 100;

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
        if (distance <= proximityThreshold && (doorCoordinates.x != 0 && doorCoordinates.y != 0)) {
            if (props.isLocked) {
                console.log("The door is locked. You can't pass!");
                setShowInformationCard(false);
            } else {

                if (!isLookingAtDoor) {
                    setShowInformationCard(true);
                    setIsLookingAtDoor(true);
                }
            }
        } else {
            setShowInformationCard(false); // Hide card if player moves away
            setIsLookingAtDoor(false)
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
                    onButtonClick={() => {
                        setShowInformationCard(false)

                        console.log("NETWORK")

                        traverseGate(props.clientId, "h").then((r : any) => {

                            console.log(r)

                            console.log(parseFloat(r.angle))
                            console.log(Number(r.angle))
                            props.setRotation(parseFloat(r.angle))
                        })
                        getProbability(props.clientId).then((r : number) => {
                            props.setValue(r)
                        })
                        // getBracket().then(r => {
                        //     console.log(r)
                        // })
                    }}
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
                height: "15%",
                top: `${props.y * 100}%`,
                left: `${props.x * 100}%`,
                transform: "translate(-50%, -50%)",
                objectFit: "contain",
            }}/>
            {renderInformationCard()}
        </>
    )
}

export default Door;