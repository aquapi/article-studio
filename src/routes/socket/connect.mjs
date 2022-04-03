// Socket server
import server from "../../loaders/socket.mjs";
// Chat message event handler
import chatMessage from "../../routes/socket/chat.mjs";
// Vote event handler
import voteEvent from "./vote.mjs";
    
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

