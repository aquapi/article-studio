import "./app/load.mjs";
import server from "./app/loaders/server.mjs";

// Listen to port 443 in HTTPS
server.listen(process.env.PORT || 443);
