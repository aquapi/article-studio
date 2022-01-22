// Socket server
import { Server as SocketServer } from "socket.io";
import chatMessage from "../../routes/socket/chat.mjs";
import { target } from "../../app/loaders/servers.mjs";
import voteEvent from "./vote.mjs";

// Socket.io server
const server = new SocketServer(target);
    
// Listen to '/discuss' namespace requests
server.of("/discuss").on("connection", socket => {
    // Chat event
    socket.on('chat message', chatMessage(socket));
});

// Listen to '/read' namespace requests
server.of("/read").on("connection", socket => {
    // Vote event
    socket.on('vote', voteEvent(socket));
});

