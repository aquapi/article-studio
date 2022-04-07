// @ts-check
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

    return (
        <>
            <Head />
            <div className="wait">
                <div id="hover-action"></div>
                {/*Search bar*/}
                <div className="search-bar">
                    <input type="text" placeholder="Search article name, tag, views, votes or author" />
                </div>
                {/*Navbar*/}
                <Navbar authorized={Csession} />
                {/*Make the background darker*/}
                <div id="inner"></div>
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
            <script src="/javascripts/homepage/main.js"></script>
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