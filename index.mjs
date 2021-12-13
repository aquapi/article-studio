import { config } from "dotenv";
import { target } from "./app/servers/servers.mjs";
import HttpsServer from "./app/dependencies/HttpsServer.mjs";
import "./app/load.mjs";

// Load ENV
config();

// Server
const server = new HttpsServer(
    target, Number(process.env.PORT) || 443, 
    process.env.LAN_IP || "0.0.0.0"
);

// Start the server
await server.start();

// Print server data
console.log("Server is listening on port " + server.port + ", address https://" + server.hostname);

