import { Server as SocketServer } from "socket.io";
import server from "./server.mjs";
import connect from "../routes/socket/connect.mjs";

// Connect
new SocketServer(server).on("connection", connect());