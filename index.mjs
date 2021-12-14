import "./app/load.mjs";
import { server } from "./app/servers/servers.mjs";

// Start the server
await server.start();

// Print server data
console.log("Server is listening on port " + server.port + ", address https://" + server.hostname);

