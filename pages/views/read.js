// @ts-check
import Head from "../components/headers/read";
import io from "socket.io-client";
import { useState, useEffect } from "react";
import hljs from "highlight.js";
import parse from "html-react-parser";
import converter from "../../src/utils/converter.mjs";
import ArticleContent from "../components/read/ArticleContent";
import Nav from "../components/read/Nav";

const detailStyle = {
    fontSize: '12px !important',
    alignSelf: 'flex-end'
}

// HTML Decoder
const htmlDecode = input =>
    new DOMParser().parseFromString(input, "text/html").documentElement.textContent;

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
            // Style sheet link
            "<link rel='stylesheet' href='https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.4.0/styles/"
            + document.querySelector("select").options.item(
                Number(localStorage.getItem("favTheme") ?? "0")
            ).id
            + ".min.css'>"
            // Convert to HTML
            + converter.makeHtml(htmlDecode(content)))

        // Highlight all code
        hljs.highlightAll();
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
            // Style
            "<link rel='stylesheet' href='https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.4.0/styles/"
            + event.target.options.item(selectedIndex).id
            + ".min.css'>"
            // Convert to HTML
            + converter.makeHtml(htmlDecode(content))
        );

        // Save to localStorage
        // @ts-ignore
        localStorage.setItem("favTheme", selectedIndex);

        // Highlight all code 
        hljs.highlightAll();
    };

    const isAuthor = user === author || coAuthor.indexOf(user) > -1;
    const contentData = {
        detailStyle,
        currentContent: currentContent ? parse(currentContent) : "",
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