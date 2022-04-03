// @ts-check
import Head from "../components/headers/discuss";
import io from "socket.io-client";
import { useState } from "react";

// User ID if they haven't signed in
const rnd = Math.round(Math.random() * 1000000);
const socket = io("/discuss");

/**
 * @param {{name: string, user: string}} props
 */

export default ({ name, user }) => {
    // Messages
    const [messages, setMessages] = useState([]);

    // Submit mesage
    /**
     * @type {React.FormEventHandler<HTMLFormElement>} e
     */
    const submitMessage = e => {
        const input = e.currentTarget.querySelector("input");
        e.preventDefault();
        if (input.value) {
            /**
             * @param {string} event Chat event
             * @param {string} message Message
             * @param {number} rnd User ID if user isn't logged in
             * @param {string} CurrentUser Current user 
             */

            socket.emit('chat message', input.value, rnd, user);
            setMessages(messages.concat({ msg: input.value, user: "Me", textAlign: "right" }));

            // Reset input form after send message
            input.value = '';
        }
    };

    // Handle socket
    // TODO: Validate whether anotherUser is equivalent to current user
    socket.on('chat', (msg, anotherUser) => {
        setMessages(
            messages.concat({ msg, textAlign: "left", user: anotherUser })
        );
    });

    return <>
        <Head name={name} />
        {/*Messages will be here*/}
        <ul id="messages">{
            messages.map(({ msg, textAlign, user: us }) =>
                <li style={{ textAlign }} key={Date.now()}>
                    <p>{msg}</p>
                    <div className="username">{us}</div>
                </li>
            )
        }</ul>
        {/*Send message form*/}
        <form id="form" onSubmit={submitMessage}>
            <input id="input" autoComplete="off" placeholder="Enter your message here" />
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