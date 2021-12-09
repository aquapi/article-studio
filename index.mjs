import { hostname, port } from "./app/resource.mjs";
import server from "./app/server.mjs";
import './app/app.mjs';

// Start the server
server.listen(port, hostname, () => {
    console.log("Server is listening on port " + port + ", address https://" + hostname);
});