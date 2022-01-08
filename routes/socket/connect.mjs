// Socket server
import { Server as SocketServer } from "socket.io";
import chatMessage from "../../routes/socket/chat.mjs";
import { target } from "../../app/loaders/servers.mjs";
import voteEvent from "./vote.mjs";

// Socket.io server
new SocketServer(target).on("connection", socket => {
    // Chat event
    socket.on('chat message', chatMessage(socket));
    // Vote event
    socket.on('vote', voteEvent(socket))
});

