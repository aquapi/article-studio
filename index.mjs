import { hostname, port } from "./app/resource.mjs";
import target from "./app/servers/server.mjs";
import HttpsServer from "./app/dependencies/HttpsServer.mjs";
import "./app/app.mjs";

// Server
const server = new HttpsServer(target, port, hostname);

// Start the server
await server.start();

// Print server data
console.log("Server is listening on port " + server.port + ", address https://" + server.hostname)

