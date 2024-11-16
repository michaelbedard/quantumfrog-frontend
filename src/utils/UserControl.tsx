import useMousePosition from "../hooks/useMousePosition";
import useMouseDown from "../hooks/useMouseDown";
import { useEffect, useRef } from "react";

interface UserControlsProps {
    backgroundPosition: { x: number; y: number };
    setBackgroundPosition: React.Dispatch<React.SetStateAction<{ x: number; y: number }>>;
    children: React.ReactNode;
}

const UserControls: React.FC<UserControlsProps> = ({ backgroundPosition, setBackgroundPosition, children }) => {

    const [mousePosition, setMousePosition] = useMousePosition();
    const [mouseDown, setMouseDown] = useMouseDown();
    const movement = 3;
    const screenwidth : number = window.innerWidth;
    const screenheight : number = window.innerHeight;
    const centerCoord : {x: number, y:number} = {x : screenwidth/2,  y: screenheight/2};
    const mouseCoord : {x: number, y:number} = {x: mousePosition.x - centerCoord.x,y: centerCoord.y - mousePosition.y}

    const lastMoveTime = useRef(0);
    const animationFrameId = useRef<number | null>(null);
    const isMouseDown = useRef(false);


    useEffect(() => {
        const updateMousePosition = (ev : MouseEvent) => {
            setMousePosition({ x: ev.clientX, y: ev.clientY });
        };

        window.addEventListener('mousemove', updateMousePosition);

        return () => {
            window.removeEventListener('mousemove', updateMousePosition);
        };
    }, []);



    const handleMouseUp = (e: any) => {
        setMouseDown(false);
        isMouseDown.current = false;
        cancelAnimationFrame(animationFrameId.current!)
    }

    const handleMouseDown = (e: any) => {
        setMouseDown(true);
        isMouseDown.current = true;
    }

    useEffect(() => {
        // Only move the background when mouseDown is true
        if (mouseDown) {
            const moveBackground = (timestamp: number) => {
                const timeElapsed = timestamp - lastMoveTime.current;

                if (timeElapsed > 16) { // Throttle to ~60 FPS (16ms per frame)
                    let angle: number = Math.acos(-mouseCoord.x / Math.sqrt(mouseCoord.x ** 2 + mouseCoord.y ** 2));
                    if (mouseCoord.y < 0) {
                        angle = -angle;
                    }

                    const xMove = Math.cos(angle) * movement;
                    const yMove = Math.sin(angle) * movement;

                    setBackgroundPosition((prev) => ({ x: prev.x + xMove, y: prev.y + yMove }));
                    lastMoveTime.current = timestamp;
                }

                if (mouseDown) {
                    animationFrameId.current = requestAnimationFrame(moveBackground);
                }
            };
            animationFrameId.current = requestAnimationFrame(moveBackground);
        } else {
            if (animationFrameId.current !== null) {
                cancelAnimationFrame(animationFrameId.current);
                animationFrameId.current = null;
            }
        }

        return () => {
            if (animationFrameId.current !== null) {
                cancelAnimationFrame(animationFrameId.current);
            }
        };
    }, [mouseDown, mousePosition]); // Re-run when mouseDown or mouseCoord changes
    
    return (
        <div onMouseDown={handleMouseDown} onMouseUp={handleMouseUp} tabIndex={0}>
            {children}
        </div>
    )
};

export default UserControls;