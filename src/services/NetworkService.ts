class WebSocketService {
    private url: string;
    private socket: WebSocket | null = null;
    private messageHandlers: ((data: string) => void)[] = [];

    constructor(url: string) {
        this.url = url;
    }

    connect(): void {
        this.socket = new WebSocket(this.url);

        this.socket.onopen = () => {
            console.log("WebSocket connection established");
        };

        this.socket.onmessage = (event: MessageEvent) => {
            console.log("Received:", event.data);
            this.messageHandlers.forEach((handler) => handler(event.data));
        };

        this.socket.onerror = (error: Event) => {
            console.error("WebSocket Error:", error);
        };

        this.socket.onclose = () => {
            console.log("WebSocket connection closed");
        };
    }

    sendMessage(message: string): void {
        if (this.socket && this.socket.readyState === WebSocket.OPEN) {
            this.socket.send(message);
        } else {
            console.warn("WebSocket is not open. Message not sent:", message);
        }
    }

    addMessageHandler(handler: (data: string) => void): void {
        this.messageHandlers.push(handler);
    }

    removeMessageHandler(handler: (data: string) => void): void {
        this.messageHandlers = this.messageHandlers.filter((h) => h !== handler);
    }

    disconnect(): void {
        if (this.socket) {
            this.socket.close();
            this.socket = null;
        }
    }
}

const webSocketService = new WebSocketService("ws://yourserver.com/socket");
export default webSocketService;
