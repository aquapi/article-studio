import "./app/app.mjs";
import { server } from "./app/config.mjs";
import { hostname, port } from "./app/resource.mjs";

// Listen
server.listen(port, hostname, () => {
    console.log('Server is listening on port ' + port + ', on address https://' + hostname);
});
