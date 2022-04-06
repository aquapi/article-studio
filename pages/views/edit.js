import Head from "../components/headers/edit";
import axios from "axios";
import { useRef, useState } from "react";
import converter from "../../src/utils/converter.mjs";

/**
 * @param {{name: string, md_content: string, image_url: string}}
 */

export default ({ name, md_content, image_url, isPrivate, isCoAuthor }) => {
    // References
    const content = useRef(md_content);
    const img_url = useRef(image_url);
    const isArticlePrivate = useRef(isPrivate);

    // Compile
    const compile = () => `
        <link rel="stylesheet" href="/stylesheets/edit/framestyle.css">
        <script src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.3.1/highlight.min.js"></script>
        <style>@import url(https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.4.0/styles/base16/ocean.min.css)</style>
        ${converter.makeHtml(content.current)}
        <script>hljs.highlightAll()</script>
    `;

    // States
    const [iframeContent, setIframeContent] = useState("");

    // Save the article
    const saveArticle = async () =>
        axios.post("/article/save", {
            name,
            content: content.current,
            display_img: img_url.current,
            private: isArticlePrivate.current
        });
    return <>
        <Head name={name} />
        {/*Navbar*/}
        <nav>
            {/*Navbar buttons left*/}
            <div style={{ display: 'flex' }}>
                {/*Save and test button*/}
                <div 
                    id='save' 
                    className="nav-item" 
                    onClick={saveArticle}
                >Save</div>
                <div 
                    id='run' 
                    className="nav-item"
                    onClick={() => 
                        setIframeContent(compile(content.current))
                    }
                >Test</div>
                {/*Is article private*/}
                <select 
                    id="private" 
                    onChange={
                        e => 
                            isArticlePrivate.current = e.target.value !== "Public"
                    }
                >
                    <option id="private-false" selected={!isPrivate} value="Public">Public</option>
                    <option id="private-true" selected={isPrivate} value="Private">Private</option>
                </select>
                {/*Co-author redirect*/}
                {!isCoAuthor
                    ? <div
                        id="co-auths"
                        className="nav-item"
                        onClick={
                            () =>
                                location.href = "/coauths/" + encodeURIComponent(name)
                        }
                    >Co-Authors</div>
                    : <></>}
            </div>
            {/*Navbar buttons right*/}
            <div style={{ display: 'flex' }}>
                <div id='image' className="nav-item" style={{ justifySelf: 'flex-end' }}>
                    <input
                        type="text"
                        name="display_img"
                        defaultValue={image_url}
                        style={{ fontFamily: 'Corbel' }}
                        id="img_url"
                        onChange={
                            e =>
                                img_url.current = e.currentTarget.value
                        } />
                </div>
                <a href={`/reader/${encodeURIComponent(name)}`}>Back</a>
            </div>
        </nav>
        {/*Write and test*/}
        <div style={{ width: '100%', display: 'flex' }}>
            {/*Write*/}
            <textarea style={{ width: '48%', padding: '10px', height: '248.6px' }}
                defaultValue={md_content}
                onChange={
                    e => 
                        content.current = e.currentTarget.value
                }
            ></textarea>
            {/*Compiled HTML*/}
            <iframe 
                style={{ width: '50%', border: '1px solid #555', height: '268.6px' }}
                srcDoc={iframeContent}
            ></iframe>
        </div>
    </>;
};

export const getServerSideProps = async (context) => {
    return {
        props: {
            name: context.query.name,
            md_content: context.query.md_content,
            image_url: context.query.image_url,
            isPrivate: context.query.isPrivate,
            isCoAuthor: context.query.isCoAuthor
        }
    }
};