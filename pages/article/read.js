import Head from "../components/headers/read";

const detailStyle = {
    fontSize: '12px !important',
    alignSelf: 'flex-end'
}

export default ({ name, admin_button, content, views, author, tag, votes }) => (
    <>
        <Head name={name} />
        {/*Data*/}
        <span>{name}</span>
        <span>{admin_button}</span>
        <span>{content}</span>
        {/*Navbar*/}
        <div style={{ display: 'flex', backgroundColor: '#111' }} id="buttons">
            <button id="back">Back</button><br />
            <button id="discuss_redirect">Discuss</button><br />
        </div>
        {/*Content and article data*/}
        <div
            style={
                {
                    display: 'flex', flexDirection: 'column', justifyContent: 'center',
                    alignItems: 'left', padding: '20px', borderLeft: '2px solid #222',
                    borderRight: '2px solid #222', marginTop: '30px'
                }
            }>
            {/*Article*/}
            <div id="content"></div>
            {/*Article data*/}
            <div style={detailStyle}> Views: {views} </div>
            <div style={detailStyle}>Author: {author}</div>
            <div style={detailStyle}>Tag: {tag}</div>
            <div style={detailStyle}>Votes: {votes}</div>
        </div>
        <script src="/javascripts/read.js"></script>
    </>
);

export const getServerSideProps = async (context) => ({
    props: {
        name: context.query.name,
        admin_button: context.query.admin_button,
        content: context.query.content, 
        views: context.query.views, 
        author: context.query.author, 
        tag: context.query.tag, 
        votes: context.query.votes
    }
});