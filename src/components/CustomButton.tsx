import React, { useEffect, useState } from "react";
import axios from "axios";

const WebSocketButton: React.FC = () => {
    const [data, setData] = useState(null);
    const [inputValue, setInputValue] = useState<string>("");

    useEffect(() => {
        axios
            .get('https://jsonplaceholder.typicode.com/posts/1')
            .then((response) => {
                setData(response.data); // Update state with data
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }, []);

    const handleSendMessage = () => {
        if (inputValue.trim()) {
            setInputValue(""); // Clear the input field after sending
        }
    };

    return (
        <div>
            <h2>WebSocket Service with Button Example</h2>
            <p>Message from server: {JSON.stringify(data)}</p>
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
