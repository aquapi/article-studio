import "./app/load.mjs";
import { target as server } from "./app/loaders/servers.mjs";

// Listen to port 443
server.listen(process.env.PORT || 443);

