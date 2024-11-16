import React from 'react';

function StartScreen({ children }  : {children : any}) {
    return (
        <div
            style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                backgroundColor: "rgba(0, 0, 0, 0.8)", // Semi-transparent black overlay
                clipPath: "circle(15% at 50% 50%)", // Transparent circle at the center
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
                    zIndex: 3, // Ensure content is above everything
                    textAlign: "center",
                }}
            >
                {children}
            </div>
        </div>
    );
}

export default StartScreen;
