export default class HttpsServer {
    #httpsServer;
    #timeout;

    /**
     * @param {https.Server} server 
     */
    constructor(server) {
        this.#httpsServer = server;
    }

    /**
     * @type {https.Server}
     */
    get server() {
        return this.#httpsServer;
    }

    /**
     * @param {number} port 
     * @param {string} hostname 
     * @returns {Promise<HttpsServer>}
     */
    start =
        async (port, hostname) =>
            new Promise(res =>
                this.server.listen(port, hostname, () => res(new HttpsServer(this.server)))
            )

    /**
     * @returns {Promise<HttpsServer>}
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
     */
    listening = listener =>
        new HttpsServer(this.server.on('listening', listener));

    /**
     * @param {import("http").RequestListener} listener 
     * @returns {Promise<HttpsServer>}
     */
    onClose = listener =>
        new HttpsServer(this.server.on('close', listener));

    /**
     * @param {import("http").RequestListener} listener 
     * @returns {Promise<HttpsServer>}
     */
    checkContinue = listener =>
        new HttpsServer(this.server.on('checkContinue', listener));

    /**
     * @param {import("http").RequestListener} listener 
     * @returns {Promise<HttpsServer>}
     */
    checkExpectation = listener =>
        new HttpsServer(this.server.on('checkExpectation', listener));

    /**
    * @param {import("http").RequestListener} listener 
    * @returns {Promise<HttpsServer>}
    */
    clientError = listener =>
        new HttpsServer(this.server.on('clientError', listener));

    /**
    * @param {import("http").RequestListener} listener 
    * @returns {Promise<HttpsServer>}
    */
    onConnect = listener =>
        new HttpsServer(this.server.on('connect', listener));

    /**
    * @param {import("http").RequestListener} listener 
    * @returns {Promise<HttpsServer>}
    */
    onConnection = listener =>
        new HttpsServer(this.server.on('connection', listener));

    /**
    * @param {import("http").RequestListener} listener 
    * @returns {Promise<HttpsServer>}
    */
    onRequest = listener =>
        new HttpsServer(this.server.on('request', listener));

    /**
    * @param {import("http").RequestListener} listener 
    * @returns {Promise<HttpsServer>}
    */
    onUpgrade = listener =>
        new HttpsServer(this.server.on('upgrade', listener));

    /**
     * @param {number} ms 
     * @returns {number} timeout
     */
    setTimeout = ms => this.#timeout = ms;

    /**
     * @param {() => void} listener 
     * @returns {Promise<HttpsServer>}
     */
    timeout = (listener = () => { }) =>
        new HttpsServer(this.server.setTimeout(this.#timeout, listener));

    /**
     * @param {https.ServerOptions} option 
     * @param {import("http").RequestListener} listener
     * @returns {typeof HttpsServer}
     */
    static create = (option, listener = () => { }) =>
        new HttpsServer(https.createServer(option, listener))
}