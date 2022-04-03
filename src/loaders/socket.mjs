// Main server
import target from "./server.mjs";

// Server constructor
import { Server as SocketServer } from "socket.io";

// Socket.io server
const server = new SocketServer(target);

// Export the socket server
export default server;