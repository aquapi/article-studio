import Head from "../components/headers/read";
import io from "socket.io-client";
import { useState, useEffect } from "react";
import hljs from "highlight.js";
import parse from "html-react-parser";
import SelectTheme from "../components/read/SelectTheme";
import converter from "../../src/utils/converter.mjs";
import ArticleContent from "../components/read/ArticleContent";

const detailStyle = {
    fontSize: '12px !important',
    alignSelf: 'flex-end'
}

/**
 * @param {{name: string, admin_button: string, content: string, views: number, author: string, tag: string, votes: number, coAuthor: string[]}}
 */
export default ({ name, content, views, author, tag, votes, user, coAuthor }) => {
    // Socket
    const socket = io("/read");

    // Vote action
    const vote = () => (
        // Change the vote detail
        document.getElementById("votesDetail").innerHTML = "Votes: " + (
            Number(
                document.getElementById("votesDetail").innerHTML
                    .replaceAll("Votes: ", "")
            ) + 1
        ), 
        // Emit vote event
        socket.emit("vote",
            user,
            document.getElementById("authorDetail").innerHTML
                .replaceAll("Author: ", ""),
            name
        )
    );

    // HTML Decoder
    const htmlDecode = input =>
        new DOMParser().parseFromString(input, "text/html").documentElement.textContent;

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
        setContent(
            // Style
            "<link rel='stylesheet' href='https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.4.0/styles/"
            + event.target.options.item(
                event.target.options.selectedIndex >= 0
                    ? event.target.options.selectedIndex
                    : 0
            ).id
            + ".min.css'>"
            // Convert to HTML
            + converter.makeHtml(htmlDecode(content))
        );

        // Save to localStorage
        localStorage.setItem("favTheme",
            event.target.options.selectedIndex >= 0
                ? event.target.options.selectedIndex
                : 0
        )

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
        <div id="buttons">
            {/*Go back*/}
            <button onClick={
                // Change location
                () => location.href =
                    sessionStorage.getItem("prevLocation") ?? "/article"
            }>Back</button><br />
            {/*Discuss*/}
            <button onClick={
                () => location.href =
                    `/discuss/${encodeURIComponent(name)}`
            }>Discuss</button><br />
            {/*Theme changer*/}
            <label htmlFor="theme-changer">Theme</label>
            <SelectTheme onChange={selectListener} />
            {/*Edit*/}
            <button style={{ display: isAuthor ? 'block' : 'none' }} onClick={
                () => location.href =
                    `/article/edit/${encodeURIComponent(name)}`
            }>Edit</button>
            {/*Delete*/}
            <button style={{ display: isAuthor ? 'block' : 'none' }} onClick={
                async () => {
                    // Delete the current article
                    if (confirm("Confirm delete?")) {
                        await axios.post("/article/delete", { name });
                        location.href = `/article`;
                    }
                }
            }>Delete</button>
            {/*Vote*/}
            <button style={{ display: isAuthor ? 'none' : 'block' }} onClick={vote}>Vote</button>
        </div>
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