import server from "./server.mjs";
import '../app.mjs';
import { hostname, port } from "../resource.mjs";

/**
 * @param {number} port 
 * @param {string} hostname 
 * @returns {Promise<void>}
 */

export default async () =>
    new Promise(res =>
        server.listen(port, hostname, () => res(null))
    )