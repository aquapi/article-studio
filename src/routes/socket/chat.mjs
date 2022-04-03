/**
 * @param {import("socket.io").Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>} socket
 * @returns {(msg: string, userID: string, CurrentUser: string) => void} Chat event listener
 */

export default socket => (
    (msg, userID, CurrentUser) => {
        // Send data to another user
        socket.broadcast.emit('chat', msg, CurrentUser ?? "User" + userID);
    } 
); 