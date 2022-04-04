// Socket server
import server from "../../loaders/socket.mjs";

// Vote event handler
import voteEvent from "./vote.mjs";

// Listen to '/read' namespace requests
server.of("/read").on("connection", socket => {
    // Vote event
    socket.on('vote', voteEvent(socket));
});

