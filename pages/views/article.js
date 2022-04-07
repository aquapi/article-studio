// @ts-check
import { useEffect, useState } from "react";
import Head from "../components/headers/article";
import Articles from "../components/homepage/Articles";
import Banner from "../components/homepage/Banner";
import Categories from "../components/homepage/Categories";
import Header from "../components/homepage/Header";
import Navbar from "../components/homepage/Navbar";
import SearchBar from "../components/homepage/SearchBar";

// Search
/**
 * @param {string} str 
 * @param {string} str1 
 */
function contain(str, str1) {
    let pos = 0;
    for (let c of str1) {
        if (!str.includes(c, pos))
            return false;
        pos++;
    }
    return true;
}

/**
 * @param {string[]} strs 
 * @param {string} str1 
 */
function containAll(strs, str1) {
    for (const str of strs)
        if (contain(str, str1))
            return true;
    return false;
}

/**
 * @param {{Csession: import("express-session").Session & Partial<import("express-session").SessionData>, headerName: string, articles: string}} props
 */

export default ({ Csession, headerName: originalHeaderName, articles: originalArticles }) => {
    // Search bar related states
    const [searchBarOpacity, setOpacity] = useState(0);
    const [navZIndex, setNavZIndex] = useState(5);
    const [defaultValueOfSearch, setDefaultValue] = useState("");

    /**
     * @type {[{user: string, name: string, content: string, display_img: string, description: string, views: number, tag: string, votes: number}[], React.Dispatch<{user: string, name: string, content: string, display_img: string, description: string, views: number, tag: string, votes: number}[]>]}
     */
    // Search algorithm related states
    const [articles, setArticles] = useState(JSON.parse(originalArticles));
    const [headerName, setHeader] = useState(originalHeaderName);
    const [createArticleJustifyContent, setJustifyContent] = useState(
        articles.length > 4
        ? "flex-start"
        : "center"
    );

    // Listeners
    const searchOnChange = e => {
        const query = e?.currentTarget?.value ?? sessionStorage.getItem("search");

        if (!query || !query.replaceAll(" ", "")) {
            // Restore the original headers
            if (headerName !== originalHeaderName)
                setHeader(originalHeaderName);
            if (articles.length < originalArticles.length)
                setArticles(JSON.parse(originalArticles));

            // Remove fields of session storage
            sessionStorage.removeItem("search");
            return;
        };

        // Set the header
        setHeader("Search Result");

        // Count found articles
        const result = JSON.parse(originalArticles).filter(article => 
            containAll(
                [article.name, article.tag, article.votes, article.views, article.user]
                    .map(s => s.toString().toLowerCase()),
                query.toLowerCase()
            )
        );

        // If articles match is more than 4
        setJustifyContent(result.length > 4 ? "flex-start" : "center");

        // Save search to sessionStorage
        sessionStorage.setItem("search", query);

        // Set articles state
        setArticles(result);
    };

    // When page first load
    useEffect(() => {
        // Redirect to previous location (article page) if exists
        if (
            sessionStorage.getItem("prevLocation")
            && sessionStorage.getItem("prevLocation") !== location.pathname
            && document.referrer.slice(document.referrer.lastIndexOf("/")) !== sessionStorage.getItem("prevLocation")
        )
            location.href = sessionStorage.getItem("prevLocation");

        // Set prev location
        sessionStorage.setItem("prevLocation", location.pathname);

        // If the user is searching
        if (sessionStorage.getItem("search")) {
            // Open the search bar
            setOpacity(1);
            setNavZIndex(3);
            // Set the value of search input
            setDefaultValue(sessionStorage.getItem("search"));
            searchOnChange();
        }

        // Scroll to previous scroll
        document.documentElement.scrollTop = Number(sessionStorage.getItem("scroll"));
    }, []);

    return (
        <>
            <Head />
            <div>
                {/*Search bar*/}
                <SearchBar opacity={searchBarOpacity} defaultValue={defaultValueOfSearch} onChange={searchOnChange} />

                {/*Navbar*/}
                <Navbar authorized={Csession} setFade={() => {
                    setOpacity(1);
                    setNavZIndex(3);
                }} display={navZIndex} />

                {/*Make the background darker. When click hide the search bar*/}
                <div id="inner" onClick={() => {
                    setOpacity(0);
                    setNavZIndex(5);
                }}></div>

                {/*Banner text*/}
                <Banner />
            </div>
            {/*Article collections links*/}
            <Categories authorized={Csession} />

            {/*Header*/}
            <Header headerName={headerName} />

            {/*Created article*/}
            <Articles justifyContent={createArticleJustifyContent} articles={articles} />
        </>
    );
};

export const getServerSideProps = async context => ({
    props: {
        Csession: context.query.Csession?.userID ?? null,
        headerName: context.query.headerName,
        articles: JSON.stringify(context.query.articles)
    }
});