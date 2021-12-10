import { Server as SocketServer } from "socket.io";
import target from "./server.mjs";
import chatMessage from "../../routes/socket/chat.mjs";

// Connect
new SocketServer(target).on("connection",  (socket) => {
    // Chat event
    socket.on('chat message', chatMessage(socket));
});