// @ts-check
import Head from "../components/headers/read";
import io from "socket.io-client";
import { useState, useEffect } from "react";
import converter from "../../src/utils/converter.mjs";
import ArticleContent from "../components/read/ArticleContent";
import Nav from "../components/read/Nav";

const detailStyle = {
    fontSize: '12px !important',
    alignSelf: 'flex-end'
}

// Use socket
/**
 * @returns {import("socket.io-client").Socket | null} 
 */
const useSocket = (uri, opts) => {
    const [socket, setSocket] = useState(null);
    useEffect(() => {
        setSocket(io(uri, opts));
    }, []);
    return socket;
};

// Template
const template = (theme, content) =>
    `<link rel='stylesheet' href='https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.4.0/styles/${theme}.min.css'>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.3.1/highlight.min.js"></script>
    <style>
        body { 
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji"; 
            font-weight: 375;
            font-size: 14px
        }
        h1, h2, h3, h4, h5, h6 {
            font-weight: 375;
        }
    </style>
    <body>
        ${content}
        <script>hljs.highlightAll()</script>
    </body>`

/**
 * @param {{name: string, admin_button: string, content: string, views: number, author: string, tag: string, votes: number, coAuthor: string[], user: string}} props
 */
export default ({ name, content, views, author, tag, votes: __votes, user, coAuthor }) => {
    const socket = useSocket("/read");

    // Get votes
    const [votes, setVotes] = useState(__votes);

    // Vote action
    const vote = () => {
        // If socket exists
        if (!socket) return;

        // Change the vote detail
        setVotes(votes + 1);

        // Emit vote event
        socket.emit("vote", user, author, name);
    };

    // Converted data
    const [currentContent, setContent] = useState(null);

    // When page loaded
    useEffect(() => {
        setContent(
            template(
                // Theme
                document.querySelector("select").options.item(
                    Number(localStorage.getItem("favTheme") ?? "0")
                ).id,
                // Content
                converter.makeHtml(content)
            )
        )
    }, []);

    // Change content
    /**
     * @type {React.ChangeEventHandler<HTMLSelectElement>}
     */
    const selectListener = event => {
        const selectedIndex = event.target.options.selectedIndex >= 0
            ? event.target.options.selectedIndex
            : 0;

        setContent(
            template(
                // Theme
                event.target.options.item(selectedIndex).id, 
                // Content
                converter.makeHtml(content)
            )
        );

        // Save to localStorage
        // @ts-ignore
        localStorage.setItem("favTheme", selectedIndex);
    };

    const isAuthor = user === author || coAuthor.indexOf(user) > -1;
    const contentData = {
        detailStyle,
        currentContent: currentContent,
        views,
        author,
        tag,
        votes
    };

    return <>
        <Head name={name} />

        {/*Navbar*/}
        <Nav vote={vote} selectListener={selectListener} name={name} isAuthor={isAuthor} />

        {/*Content and article data*/}
        <ArticleContent {...contentData} />
    </>;
};

export const getServerSideProps = async (context) => ({
    props: {
        name: context.query.name,
        content: context.query.content,
        views: context.query.views,
        author: context.query.author,
        tag: context.query.tag,
        votes: context.query.votes,
        user: context.query.user,
        coAuthor: context.query.coAuthor
    }
});