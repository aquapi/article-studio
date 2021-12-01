export default (msg, userID, CurrentUser) => {
    // Send data to another user
    s.broadcast.emit('chat message', msg, "left", CurrentUser ?? "User" + userID);

    // Send data to current user
    s.emit('chat message', msg, "right", "Me");
}