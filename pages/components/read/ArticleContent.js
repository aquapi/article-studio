export default ({ detailStyle, currentContent, views, author, tag, votes }) =>
    <div
        style={{
            display: 'flex', flexDirection: 'column', justifyContent: 'center',
            alignItems: 'left', padding: '20px', borderLeft: '2px solid #222',
            borderRight: '2px solid #222', marginTop: '30px'
        }}>
        {/*Article*/}
        <iframe id="content" srcDoc={currentContent} onLoad={
            e => 
                e.currentTarget.style.height = 
                    e.currentTarget.contentWindow.document.body.scrollHeight + 50 + 'px'
        }></iframe>
        {/*Article data*/}
        <div style={detailStyle} id="viewsDetail">{"Views: " + views}</div>
        <div style={detailStyle} id="authorDetail">{"Author: " + author}</div>
        <div style={detailStyle} id="tagDetail">{"Tag: " + tag}</div>
        <div style={detailStyle} id="votesDetail">{"Votes: " + votes}</div>
    </div>