import Head from "../components/headers/edit"

export default ({ name, md_content, image_url }) => (
    <>
        <Head name={name} />
        {/*Navbar*/}
        <nav>
            {/*Data*/}
            <span>{name}</span>
            {/*Navbar buttons*/}
            <div style={{ display: 'flex' }}>
                <div id='save' className="nav-item">Save</div>
                <div id='run' className="nav-item">Test</div>
            </div>
            <div style={{ display: 'flex' }}>
                <div id='image' className="nav-item" style={{ justifySelf: 'flex-end' }}>
                    <input type="text" name="display_img" defaultValue={image_url} style={{ fontFamily: 'Corbel' }} id="img_url" />
                </div>
                <div className="nav-item" id='back'>Back</div>
            </div>
        </nav>
        {/*Write and test*/}
        <div style={{ width: '100%', display: 'flex' }}>
            <textarea style={{ width: '48%', padding: '10px', height: '248.6px' }} defaultValue={md_content}></textarea>
            <iframe style={{ width: '50%', border: '1px solid #555', height: '268.6px' }}></iframe>
        </div>
        {/*All data will be here before sending to the server*/}
        <form id="result">
            <input name="name" defaultValue={name} />
            <textarea name="content" className="save"></textarea>
            <input name="display_img" className="save" />
            <button id="submit"></button>
        </form>
        <script src="/javascripts/content/edit.js"></script>
    </>
);

export const getServerSideProps = async (context) => {
    return {
        props: {
            name: context.query.name,
            md_content: context.query.md_content,
            image_url: context.query.image_url
        }
    }
};