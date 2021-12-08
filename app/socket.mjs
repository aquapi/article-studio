import { Server as SocketServer } from "socket.io";
import server from "./server.mjs";
import chatMessage from "../routes/socket/chat.mjs";

// Connect
new SocketServer(server).on("connection",  (socket) => {
    // Chat event
    socket.on('chat message', chatMessage(socket));
});