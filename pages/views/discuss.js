// @ts-check
import Head from "../components/headers/discuss";
import io from "socket.io-client";
import { useEffect, useState } from "react";
import Messages from "../components/discuss/Messages";

/**
 * @param {{name: string, user: string}} props
 */

export default ({ name, user }) => {
    // Messages
    const [messages, setMessages] = useState([]);
    /**
     * @type [import("socket.io-client").Socket , React.Dispatch<import("socket.io-client").Socket>]
     */
    const [socket, setSocket] = useState(null);

    useEffect(() => {
        setSocket(io("/discuss"));
    }, [])

    useEffect(() => {
        // Handle socket
        if (!socket) return;
        socket.on('chat', (/** @type {string} */ msg, /** @type {string} */ anotherUser) => {
            setMessages(
                [...messages, {
                    msg,
                    textAlign: "left",
                    user: anotherUser
                }]
            );
        });
        return () => socket
            ? void socket.off()
            : null;
    }, [socket, messages]);

    // Submit mesage
    /**
     * @type {React.FormEventHandler<HTMLFormElement>} 
     */
    const submitMessage = e => {
        if (!socket) return;

        const input = e.currentTarget.querySelector("input");
        e.preventDefault();

        // Change messages 
        setMessages(
            [...messages, {
                msg: input.value,
                user: "Me",
                textAlign: "right"
            }]
        );

        /**
         * @param {string} event Chat event
         * @param {string} message Message
         * @param {number} rnd User ID if user isn't logged in
         * @param {string} CurrentUser Current user 
         */

        socket.emit('chat message', input.value, user);
    };

    return <>
        <Head name={name} />
        {/*Messages will be here*/}
        <Messages messages={messages} />
        {/*Send message form*/}
        <form id="form" onSubmit={submitMessage}>
            <input id="input" autoComplete="off" placeholder="Enter your message here" required={true} />
            <button>Send</button>
        </form>
    </>;
}

// Server property
export const getServerSideProps = async (context) => {
    return {
        props: {
            name: context.query.name,
            user: context.query.user
        }
    }
}