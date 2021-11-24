import { socket } from "../../app/config.js";

// Socket event
socket.on('connection', (s) => {
    // Chat event
    s.on('chat message', (msg, userID, CurrentUser) => {
        // Send data to another user
        s.broadcast.emit('chat message', msg, "left", CurrentUser ? CurrentUser : "User" + userID);

        // Send data to current user
        s.emit('chat message', msg, "right", "Me");
    });
});
