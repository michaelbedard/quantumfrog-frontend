import React, {useState} from 'react';

function StartScreenOverlay({ children }  : {children : any}) {
    const [step, setStep] = useState(0);
    const [isStoryEnded, setIsStoryEnded] = useState(false);

    const handleClick = () => {
        if (step === 0) {
            console.log("First click: Showing the next text.");
        } else if (step === 1) {
            console.log("Second click: Logging something else.");
        } else if (step === 2) {
            console.log("Third click: Animating circle expansion.");
            setIsStoryEnded(true);
        }

        setStep((prevStep) => prevStep + 1);
    };

    const getText = () => {
        if (step === 0) {
            return "Once Upon a time, there was a frog ...";
        } else if (step === 1) {
            return "The frog met a prince ...";
        } else {
            return "The story ends here.";
        }
    };

    return (
        <div>
            <div
                style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    backgroundColor: "rgba(0, 0, 0, 0.8)",
                    clipPath: isStoryEnded
                        ? "circle(100% at 50% 50%)"
                        : "circle(15% at 50% 30%)",
                    transition: "clip-path 1s ease-in-out",
                    zIndex: 2,
                }}
            >
                {children}
            </div>

            <div
                style={{
                    position: "absolute",
                    top: "70%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    color: "white",
                    zIndex: 3,
                    textAlign: "center",
                    opacity: isStoryEnded ? 0 : 1,
                    transition: "opacity 1s ease-in-out",
                }}
            >
                {getText()}
            </div>

            <div
                style={{
                    position: "absolute",
                    top: "90%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    color: "white",
                    zIndex: 3,
                    textAlign: "center",
                    opacity: isStoryEnded ? 0 : 1,
                    transition: "opacity 1s ease-in-out",
                }}
            >
                <button onClick={handleClick}> Next </button>
            </div>
        </div>
    );
}

export default StartScreenOverlay;
