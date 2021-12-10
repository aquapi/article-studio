const httpsEvent = [
    "listening", "close", "checkContinue", "checkExpectation", 
    "clientError", "connect", "connection", "request", "upgrade",
    'keylog', 'newSession', 'OCSPRequest', 'resumeSession', 
    'secureConnection', 'tlsClientError', 'error'
];

export default class HttpsServer {
    #httpsServer;
    #timeout;

    /**
     * @param {import("https").Server} server 
     */
    constructor(server) {
        this.#httpsServer = server;
        for (const ev of httpsEvent) {
            /**
             * @param {(...args: any[]) => void} listener 
             * @returns {HttpsServer}
             */
            this["on" + ev.charAt(0).toUpperCase() + ev.slice(1)] = listener =>
                new HttpsServer(this.server.on(ev, listener))
        }
    }

    /**
     * @type {import("https").Server}
     * 
     * get the https server
     */
    get server() {
        return this.#httpsServer;
    }

    /**
     * @param {number} port 
     * @param {string} hostname 
     * @returns {Promise<HttpsServer>}
     * Start the server
     */
    start =
        async (port, hostname) =>
            new Promise((res, rej) => {
                try {
                    this.server.listen(port, hostname, () => res(new HttpsServer(this.server)));
                } catch (e) {
                    rej(e);
                }
            })

    /**
     * @returns {Promise<HttpsServer>}
     * Close the server
     */
    stop = async () =>
        new Promise((res, rej) =>
            this.server.close(err => {
                if (err) rej(err);
                res(new HttpsServer(this.server));
            })
        )

    /**
     * @param {number} ms 
     * @returns {number} timeout
     * 
     * Server timeout
     */
    setTimeout = ms => this.#timeout = ms;

    /**
     * @param {() => void} listener 
     * @returns {Promise<HttpsServer>}
     * Timeout event
     */
    timeout = (listener = () => { }) =>
        new HttpsServer(this.server.setTimeout(this.#timeout, listener));
}