import { hostname, port } from "./app/resource.mjs";
import start from "./app/servers/start.mjs";

// Start the server
await start();

// Server data
console.log("Server is listening on port " + port + ", address https://" + hostname);