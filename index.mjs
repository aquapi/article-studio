import { hostname, port } from "./app/resource.mjs";
import target from "./app/servers/server.mjs";
import HttpsServer from "./app/dependencies/HttpsServer.mjs";
import "./app/app.mjs";

// Server
const server = new HttpsServer(target);

// Start the server
await server.start(port, hostname);

// Server data
console.log("Server is listening on port " + port + ", address https://" + hostname);