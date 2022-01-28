import Head from "../components/headers/edit";

/**
 * @param {{name: string, md_content: string, image_url: string}}
 */

export default ({ name, md_content, image_url, isPrivate }) => (
    <>
        <Head name={name} />
        {/*Navbar*/}
        <nav>
            {/*Navbar buttons*/}
            <div style={{ display: 'flex' }}>
                <div id='save' className="nav-item">Save</div>
                <div id='run' className="nav-item">Test</div>
                <select id="private">
                    <option id="private-false" selected={!isPrivate}>Public</option>
                    <option id="private-true" selected={isPrivate}>Private</option>
                </select>
            </div>
            <div style={{ display: 'flex' }}>
                <div id='image' className="nav-item" style={{ justifySelf: 'flex-end' }}>
                    <input type="text" name="display_img" defaultValue={image_url} style={{ fontFamily: 'Corbel' }} id="img_url" />
                </div>
                <a href={`/reader/${encodeURIComponent(name)}`}>Back</a>
            </div>
        </nav>
        {/*Write and test*/}
        <div style={{ width: '100%', display: 'flex' }}>
            <textarea style={{ width: '48%', padding: '10px', height: '248.6px' }} value={md_content}></textarea>
            <iframe style={{ width: '50%', border: '1px solid #555', height: '268.6px' }}></iframe>
        </div>
        <script type="text/javascript" src="/javascripts/getData.js"></script>
        <script src="/javascripts/content/edit.js"></script>
    </>
);

export const getServerSideProps = async (context) => {
    return {
        props: {
            name: context.query.name,
            md_content: context.query.md_content,
            image_url: context.query.image_url,
            isPrivate: context.query.isPrivate
        }
    }
};