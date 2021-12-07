import chatMessage from "./chat.mjs";

/**
 * @returns {(socket: import("socket.io").Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>) => void} Socket connection
 */

export default () => (
    (socket) => {
        // Chat event
        socket.on('chat message', chatMessage(socket));
    }
);
