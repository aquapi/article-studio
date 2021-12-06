import Head from "../components/headers/article";
import ArticleTemplate from "../components/homepage/articleTemplate";

/**
 * @param {{Csession: import("express-session").Session & Partial<import("express-session").SessionData>, headerName: string, articles: {name: string, content: string, views: number, author: string, votes: number}[]}} 
 */
export default ({ Csession, headerName, articles }) => (
    <>
        <Head />
        <div className="wait">
            <div id="hover-action"></div>
            {/*Search bar*/}
            <div className="search-bar">
                <input type="text" placeholder="Search" />
            </div>
            {/*Navbar*/}
            <nav id="nav">
                {/*Navbar buttons*/}
                <div style={{ display: 'flex' }} id="nav_button">
                    <div className="create" id="new">NEW</div>
                    <div className="create" id="sign">SIGN UP</div>
                    <div className="create" id="login">LOGIN</div>
                </div>
                {/*Navbar search icon*/}
                <div className="input">
                    <button
                        style={{
                            margin: '0px', backgroundColor: 'transparent !important', borderColor: 'transparent',
                            borderStyle: 'solid', borderWidth: '5px', height: '36px'
                        }}>
                        <i className="fa fa-search" style={{ 
                            backgroundColor: 'transparent', color: 'white', fontSize: '16px' 
                        }}></i>
                    </button>
                </div>
            </nav>
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
        <span style={{ display: 'none' }}>{articles.map(d => d.name).join("§")}</span>
        <script src="/javascripts/homepage/main.js"></script>
        {/*Article collections links*/}
        <div id="sort">
            <div className="list">Discover</div>
            <div className="list">Most Voted</div>
            {Csession ? <>
                <div className='list'>My Article</div>
                <div className='list'>Other Article</div>
            </> : <></>}
            <script src="/javascripts/homepage/collections.js"></script>
        </div>
        {/*Header*/}
        <h2 style={{ fontFamily: 'Oxygen' }} id="header-name">{headerName}</h2>
        <hr style={{ width: '10%' }} />
        {/*Created article*/}
        <div id='created-article'>
            {articles.map(d => <ArticleTemplate data={d.data} key={d.data.name}/>)}
        </div>
        {/*Scripts*/}
        <script src="/javascripts/homepage/links.js"></script>
        <script src="/javascripts/homepage/navbuttons.js"></script>
        <script src="/javascripts/homepage/endscript.js"></script>
    </>
);

export const getServerSideProps = async (context) => ({
    props: {
        Csession: context.query.Csession?.userID ?? null,
        headerName: context.query.headerName,
        articles: context.query.articles
    }
});