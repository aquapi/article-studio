// Main app
import app from "./express.mjs";
// HTTPS Module
import https from "https";
// File System
import fs from "fs";
import { config } from 'dotenv';
// Next.js
import { default as Next } from "next";
// Main server
import HttpsServer from "../dependencies/HttpsServer.mjs";

// Load ENV
config();

// Next.js server
export const next = Next({
    dev: process.env.NODE_ENV !== "production"
});

// HTTPS server
export const target = https.createServer({
    key: fs.readFileSync("ssl/key.pem"),
    cert: fs.readFileSync('ssl/cert.pem')
}, app);

// Main server
export const server = new HttpsServer(
    target, Number(process.env.PORT) || 443,
    process.env.LAN_IP || "0.0.0.0"
);

// Socket connection
import { Server as SocketServer } from "socket.io";
import chatMessage from "../../routes/socket/chat.mjs";

// Socket.io server
new SocketServer(target).on("connection", (socket) => {
    // Chat event
    socket.on('chat message', chatMessage(socket));
});