// @ts-check

/**
 * Asynchronous HTTPS Node.js Implementation
 * @example
 * import https from "https";
 * import fs from "fs";
 * import express from "express";
 * import HttpsServer from "HttpsServer.mjs";
 * 
 * // Express server
 * const app = express();
 * 
 * app.get("/", (_, res) => res.end("Hello World"));
 * 
 * // HTTPS async server
 * const server = new HttpsServer(
 *     https.createServer({
 *         key: fs.readFileSync("ssl/key.pem"),
 *         cert: fs.readFileSync('ssl/cert.pem')
 *     }, app), 
 *     443, "0.0.0.0"
 * );
 * 
 * // Run right after the server is started ('listening event')
 * server.onListening(() => console.log("Server is running"));
 * 
 * // Start the server
 * await server.start();
 */

export default class HttpsServer {
    /**
     * @type {import("https").Server}
     */
    #httpsServer;

    /**
     * @type {number | null}
     */
    timeout;

    /**
     * @type {number}
     */
    port;

    /**
     * @type {string}
     */
    hostname;

    /**
     * @param {import("https").Server} server 
     * @param {number} port
     * @param {string} hostname
     * 
     * Constructor
     */
    constructor(server, port = 443, hostname = "0.0.0.0") {
        this.#httpsServer = server;
        this.port = port;
        this.hostname = hostname;
        this.timeout = null;
        for (const ev of [
            "listening", "close", "checkContinue", "checkExpectation",
            "clientError", "connect", "connection", "request", "upgrade",
            'keylog', 'newSession', 'OCSPRequest', 'resumeSession',
            'secureConnection', 'tlsClientError', 'error'
        ]) {
            /**
             * @param {(...args: any[]) => void} listener 
             * @returns {HttpsServer} this server
             * 
             * @example
             * // Handle server close event
             * server.onClose(() => {
             *     // Code here
             * }) 
             */
            this["on" + ev.charAt(0).toUpperCase() + ev.slice(1)] = listener => (
                this.server.on(ev, listener), this
            )
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
     * @returns {Promise<HttpsServer>} the current server
     * 
     * Start the server
     */
    start =
        async () =>
            new Promise((res, rej) =>
                (this.server.listening) ?
                    rej("Server is listening to another port or another host")
                    : this.server.listen(this.port, this.hostname, () =>
                        res(this)
                    )
            )

    /**
     * @returns {Promise<HttpsServer>} the current server
     * 
     * Close the server
     */
    stop = async () =>
        new Promise(
            (res, rej) =>
                (!this.server.listening) ?
                    res(this)
                    : this.server.close(err =>
                        (err) ? rej(err) : res(this)
                    )
        )

    /**
     * @param {() => void} listener 
     * @returns {HttpsServer} the current server
     * 
     * Timeout event
     */
    onTimeout = (listener = () => { }) => (
        this.server.setTimeout(this.timeout, listener), this
    )
}