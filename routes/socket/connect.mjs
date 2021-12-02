import { socket } from "../../app/config.mjs";
import chatMessage from "./chat.mjs";

// Socket event
socket.on('connection', (s) => {
    // Chat event
    s.on('chat message', chatMessage(s));
});
