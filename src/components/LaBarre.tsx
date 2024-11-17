import React, {useState} from "react";
import ReactDOM from "react-dom";
import InformationCard from "./InformationCard";

interface LaBarreProps {
    value: number;
    isStoryEnded: boolean;
}

const LaBarre: React.FC<{props: LaBarreProps}> = ({ props }) => {
    // Ensure value is between -1 and 1
    const clampedValue = Math.min(Math.max(props.value, -1), 1);
    const [showInformationCard, setShowInformationCard] = useState(false);

    // Calculate the percentage of each side (left and right)
    const rightFill = clampedValue > 0 ? clampedValue : 0;
    const leftFill = clampedValue < 0 ? -clampedValue : 0;

    const containerStyle: React.CSSProperties = {
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center", // Center horizontally
        alignItems: "center", // Center vertically
    };

    // Styles for the outer container and the two halves
    const barStyle: React.CSSProperties = {
        width: "50%", // 70% of the screen width
        height: "3vh",
        backgroundColor: "white",
        border: "1px solid #ccc",
        display: props.isStoryEnded ? "flex" : "none",
        cursor: props.isStoryEnded ? "pointer" : "default",
        position: "relative",
        transition: "opacity 0.3s ease",
    };

    const leftHalfStyle = {
        height: "100%",
        backgroundColor: "red",
        transition: "width 0.3s ease",
        width: `${leftFill * 100}%`, // Percentage of the left side filled
    };

    const rightHalfStyle = {
        height: "100%",
        backgroundColor: "orange",
        transition: "width 0.3s ease",
        width: `${rightFill * 100}%`, // Percentage of the right side filled
    };

    const onclick = () => {
        if (!props.isStoryEnded) {
            return;
        }

        setShowInformationCard(true)
    }


    // Portal rendering logic
    const renderInformationCard = () => {
        if (showInformationCard) {
            return ReactDOM.createPortal(
                <InformationCard
                    title="BAR"
                    description="YYY"
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
            <div style={containerStyle}>
                <div style={barStyle} onClick={onclick}>
                    <div style={leftHalfStyle}></div>
                    <div style={rightHalfStyle}></div>
                </div>
            </div>
            {renderInformationCard()}
        </>
    )
};

export default LaBarre;