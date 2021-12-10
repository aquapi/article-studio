import server from "./server.mjs";
import '../app.mjs';

/**
 * @param {number} port 
 * @param {string} hostname 
 * @returns {Promise<void>}
 */

export default async (port, hostname) =>
    new Promise(res =>
        server.listen(port, hostname, () => res(null))
    )