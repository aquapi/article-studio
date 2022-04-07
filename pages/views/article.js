// @ts-check
import { useEffect, useState } from "react";
import Head from "../components/headers/article";
import Article from "../components/homepage/Article";
import Categories from "../components/homepage/Categories";
import Navbar from "../components/homepage/Navbar";

/**
 * @param {
    {
        Csession: import("express-session").Session & Partial<import("express-session").SessionData>, 
        headerName: string, 
        articles: string
    }
} props
 */

export default ({ Csession, headerName: originalHeaderName, articles: originalArticles }) => {
    /**
     * @type {{user: string, name: string, content: string, display_img: string, description: string, views: number, tag: string, votes: number}[]}
     */
    const articles = JSON.parse(originalArticles);
    const headerName = originalHeaderName;

    // States
    const [searchBarOpacity, setOpacity] = useState(0);
    const [navDisplay, setNavDisplay] = useState("flex");
    const [defaultValueOfSearch, setDefaultValue] = useState("");

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
        if (sessionStorage.getItem("isSearching")) {
            // Open the search bar
            setOpacity(1);
            setNavDisplay("hidden");
            // Set the value of search input
            setDefaultValue(sessionStorage.getItem("search"));
        }
    }, []);

    return (
        <>
            <Head />
            <div className="wait">
                {/*Search bar*/}
                <div className="search-bar" style={{ opacity: searchBarOpacity }}>
                    <input 
                        type="text" 
                        placeholder="Search article name, tag, views, votes or author" 
                        defaultValue={defaultValueOfSearch} 
                    />
                </div>
                {/*Navbar*/}
                <Navbar authorized={Csession} setFade={() => {
                    setOpacity(1);
                    setNavDisplay("hidden");
                }} display={navDisplay} />
                {/*Make the background darker*/}
                <div id="inner" onClick={() => {
                    setOpacity(0);
                    setNavDisplay("flex");
                }}></div>
                {/*Banner text*/}
                <div id="banner-text">
                    <h1>Article Studio</h1>
                    <h6>A place for creating creative articles</h6>
                </div>
                <div className="banner"></div>
            </div>
            {/*Data*/}
            <span style={{ display: 'none' }}>{Csession}</span>
            <span style={{ display: 'none' }}>{headerName}</span>
            <script type="text/javascript" src="/javascripts/getData.js"></script>
            {/*Article collections links*/}
            <Categories authorized={Csession} />
            {/*Header*/}
            <h2 style={{ fontFamily: 'Oxygen' }} id="header-name">{headerName}</h2>
            <hr style={{ width: '10%' }} />
            {/*Created article*/}
            <div id='created-article'>
                {articles.map(d => <Article data={d} key={d.name} />)}
            </div>
            {/*Scripts*/}
            <script src="/javascripts/homepage/endscript.js"></script>
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