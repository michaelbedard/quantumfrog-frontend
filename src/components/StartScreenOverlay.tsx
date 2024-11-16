import React from 'react';

function StartScreenOverlay({ children }  : {children : any}) {
    return (
        <div
            style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                backgroundColor: "rgba(0, 0, 0, 0.8)", // Semi-transparent black overlay
                clipPath: "circle(15% at 50% 30%)", // Transparent circle at the center
                zIndex: 2, // Ensures the overlay is above the background
            }}
        >
            <div
                style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    color: "white",
                    zIndex: 3,
                    textAlign: "center",
                }}
            >
                <div style={{position: "relative"}}>
                    {children}
                </div>
            </div>
        </div>
    );
}

export default StartScreenOverlay;
