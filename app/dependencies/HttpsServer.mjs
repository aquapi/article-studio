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
 * // Target HTTPS Server
 * const target = https.createServer({
 *     key: fs.readFileSync("ssl/key.pem"),
 *     cert: fs.readFileSync('ssl/cert.pem')
 * }, app);
 * 
 * // HTTPS async server
 * const server = new HttpsServer(target);
 * 
 * // Run right after the server is started ('listening event')
 * server.onListening(() => console.log("Server is running"));
 * 
 * // Start the server
 * await server.start(443, "0.0.0.0");
 */

export default class HttpsServer {
    #httpsServer;
    timeout;
    port;
    hostname;

    /**
     * @param {import("https").Server} server 
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
     * @returns {Promise<HttpsServer>} the current server
     * 
     * Start the server
     */
    start =
        async () =>
            new Promise((res, rej) => {
                try {
                    if (this.timeout) {
                        if (!(this.timeout instanceof Number))
                            rej("Time out must be a number");
                        this.onTimeout();
                    }
                    if (this.server.listening)
                        rej("Server is listening to another port or another host");
                    this.server.listen(this.port, this.hostname, () => {
                        res(new HttpsServer(this.server))
                    });
                } catch (e) {
                    rej(e);
                }
            })

    /**
     * @returns {Promise<HttpsServer>} the current server
     * 
     * Close the server
     */
    stop = async () =>
        new Promise(
            (res, rej) => {
                if (!this.server.listening)
                    res(new HttpsServer(this.server));
                this.server.close(err => {
                    if (err) rej(err);
                    res(new HttpsServer(this.server));
                });
            }
        )

    /**
     * @param {() => void} listener 
     * @returns {HttpsServer} the current server
     * 
     * Timeout event
     */
    onTimeout = (listener = () => { }) =>
        new HttpsServer(this.server.setTimeout(this.timeout, listener));
}