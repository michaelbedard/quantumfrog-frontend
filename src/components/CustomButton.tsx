import React, { useEffect, useState } from "react";
import webSocketService from "../services/NetworkService";

const WebSocketButton: React.FC = () => {
    const [message, setMessage] = useState<string>("");
    const [inputValue, setInputValue] = useState<string>("");

    useEffect(() => {
        // Connect the WebSocket when the component mounts
        webSocketService.connect();

        // Add a message handler to update the state with received messages
        const handleMessage = (data: string) => {
            setMessage(data);
        };

        webSocketService.addMessageHandler(handleMessage);

        // Cleanup on component unmount
        return () => {
            webSocketService.removeMessageHandler(handleMessage);
            webSocketService.disconnect();
        };
    }, []);

    const handleSendMessage = () => {
        if (inputValue.trim()) {
            webSocketService.sendMessage(inputValue);
            setInputValue(""); // Clear the input field after sending
        }
    };

    return (
        <div>
            <h2>WebSocket Service with Button Example</h2>
            <p>Message from server: {message}</p>
            <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Type your message"
            />
            <button onClick={handleSendMessage}>Send Message</button>
        </div>
    );
};

export default WebSocketButton;
