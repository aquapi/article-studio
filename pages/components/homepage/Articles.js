import Article from "./Article";

export default ({ justifyContent, articles = [] }) =>
    <div id='created-article' style={{ justifyContent }}>
        {articles.map(d => <Article data={d} key={d.name} />)}
    </div>