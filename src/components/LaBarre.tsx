import React from "react";

interface LaBarreProps {
    value: number;
}

const LaBarre: React.FC<{props: LaBarreProps}> = ({ props }) => {
    // Ensure value is between -1 and 1
    const clampedValue = Math.min(Math.max(props.value, -1), 1);

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
        display: "flex",
        position: "relative",
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
    if(clampedValue <= 0) {
        return (
            <div style={containerStyle}>
                <div style={barStyle}>
                    <div style={leftHalfStyle}></div>
                    <div style={rightHalfStyle}></div>
                </div>
            </div>
        )
    } else {
        return (
            <div style={containerStyle}>
                <div style={barStyle}>
                    <div style={leftHalfStyle}></div>
                    <div style={rightHalfStyle}></div>
                </div>
            </div>
        )
    }
};

export default LaBarre;