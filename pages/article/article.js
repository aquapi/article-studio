import Head from "../components/headers/article";
import ArticleTemplate from "../components/homepage/articleTemplate";

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
                    <div class="create" id="new">NEW</div>
                    <div class="create" id="sign">SIGN UP</div>
                    <div class="create" id="login">LOGIN</div>
                </div>
                {/*Navbar search icon*/}
                <div className="input">
                    <button
                        style={{
                            margin: '0px', backgroundColor: 'transparent !important', borderColor: 'transparent',
                            borderStyle: 'solid', borderWidth: '5px', height: '36px'
                        }}>
                        <i className="fa fa-search" style={{ backgroundColor: 'transparent', color: 'white', fontSize: '16px' }}></i>
                    </button>
                </div>
            </nav>
            {/*Make the background darker*/}
            <div id="inner"></div>
            {/*Banner text*/}
            <div id="banner-text">
                <h1>
                    Article Studio</h1>
                <h6>
                    A place for creating creative articles
                </h6>
            </div>
            <div className="banner"></div>
        </div>
        <span style={{ display: 'none' }}>{Csession.userID}</span>
        <span style={{ display: 'none' }}>{headerName}</span>
        <span style={{ display: 'none' }}>{articles.map(d => d.name)}</span>
        <script src="/javascripts/article.js"></script>
        <div id="sort">
            <div class="list">Discover</div>
            <div class="list">Most Voted</div>
            {Csession.userID ? <>
                <div class='list'>My Article</div>
                <div class='list'>Other Article</div>
            </> : <></>}
            <script src="/javascripts/homepage/collections.js"></script>
        </div>
        <h2 style={{ fontFamily: 'Oxygen' }} id="header-name">{headerName}</h2>
        <hr style={{ width: '10%' }} />
        <div id='created-article'>
            {articles.map(d => <ArticleTemplate data={d.data} />)}
        </div>
        <script src="/javascripts/homepage/links.js"></script>
        <script src="/javascripts/homepage/navbuttons.js"></script>
        <script src="/javascripts/homepage/endscript.js"></script>
    </>
);

export const getServerSideProps = async (context) => ({
    props: {
        Csession: context.query.Csession,
        headerName: context.query.headerName,
        articles: context.query.articles
    }
});