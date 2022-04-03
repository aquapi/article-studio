import "./src/load.mjs";
import server from "./src/loaders/server.mjs";

// Listen to port 443 in HTTPS
server.listen(process.env.PORT || 8443);
