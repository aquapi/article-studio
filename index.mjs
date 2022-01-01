import "./app/load.mjs";
import { target as server } from "./app/loaders/servers.mjs";

// Prevent memory leaks
process.setMaxListeners(0);

// Listen to port 443
server.listen(process.env.PORT || 443, "0.0.0.0");

