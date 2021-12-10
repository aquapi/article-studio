export default class HttpsServer {
    #httpsServer;
    #timeout;

    /**
     * @param {import("https").Server} server 
     */
    constructor(server) {
        this.#httpsServer = server;
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
    close = async () =>
        new Promise((res, rej) =>
            this.server.close(err => {
                if (err) rej(err);
                res(new HttpsServer(this.server));
            })
        )

    /**
     * @param {import("http").RequestListener} listener 
     * @returns {Promise<HttpsServer>}
     * Listening event
     */
    listening = listener =>
        new HttpsServer(this.server.on('listening', listener));

    /**
     * @param {import("http").RequestListener} listener 
     * @returns {Promise<HttpsServer>}
     * Close event
     */
    onClose = listener =>
        new HttpsServer(this.server.on('close', listener));

    /**
     * @param {import("http").RequestListener} listener 
     * @returns {Promise<HttpsServer>}
     * Check continue event
     */
    checkContinue = listener =>
        new HttpsServer(this.server.on('checkContinue', listener));

    /**
     * @param {import("http").RequestListener} listener 
     * @returns {Promise<HttpsServer>}
     * Check expectation event
     */
    checkExpectation = listener =>
        new HttpsServer(this.server.on('checkExpectation', listener));

    /**
    * @param {import("http").RequestListener} listener 
    * @returns {Promise<HttpsServer>}
    * Client error event
    */
    clientError = listener =>
        new HttpsServer(this.server.on('clientError', listener));

    /**
    * @param {import("http").RequestListener} listener 
    * @returns {Promise<HttpsServer>}
    * Connect event
    */
    onConnect = listener =>
        new HttpsServer(this.server.on('connect', listener));

    /**
    * @param {import("http").RequestListener} listener 
    * @returns {Promise<HttpsServer>}
    * Connection event
    */
    onConnection = listener =>
        new HttpsServer(this.server.on('connection', listener));

    /**
    * @param {import("http").RequestListener} listener 
    * @returns {Promise<HttpsServer>}
    * Request event
    */
    onRequest = listener =>
        new HttpsServer(this.server.on('request', listener));

    /**
    * @param {import("http").RequestListener} listener 
    * @returns {Promise<HttpsServer>}
    * Upgrade event
    */
    onUpgrade = listener =>
        new HttpsServer(this.server.on('upgrade', listener));

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