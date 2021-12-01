export default ({ data }) => (
    <div class="created">
        <div id={data.name} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', overflow: 'hidden', maxHeight: '480.63px' }} class={data.tag}>
            <img src={data.display_img && data.display_img !== "undefined" && data.display_img !== "Display image url" ? data.display_img : "images/image-icon.jpg"} height="150px" width="276px" onerror="this.src = 'images/image-icon.jpg'" />
            <h3>{data.name.length <= 21 ? data.name : data.name.slice(0, 21) + "..."}</h3>
            <div style={{ maxWidth: '250px', textAlign: i.description.length <= 110 ? "justify" : "left", fontSize: '13px' }} class="article-content">
                {i.description && i.description !== "undefined" ? (i.description.length <= 70 ? i.description : i.description.slice(0, 67) + "...") :
                    "Lorem ipsum dolor sit amet, consectetur adipiscing \
                    elit, sed do eiusmod..."}
            </div>
        </div>
    </div>
); 

// Empty
export const getServerSideProps = () => ({});