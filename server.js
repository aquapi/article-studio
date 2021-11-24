import { server } from "./app/config.js";
import { hostname, port } from "./resource/resource.js";
import "./app/app.js";

// Listen
server.listen(port, hostname, () => {
    console.log('Server is listening on port ' + port + ', on address https://' + hostname);
});
