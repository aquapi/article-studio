import "./app/app.mjs";
import { server } from "./app/config.mjs";
import { hostname, port } from "./resource/resource.mjs";

// Listen
server.listen(port, hostname, () => {
    console.log('Server is listening on port ' + port + ', on address https://' + hostname);
});
