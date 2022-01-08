import Article from "../../models/article.mjs";

/**
 * @param {import("socket.io").Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>} socket
 * @returns {(username: string, password: string) => Promise<void>} Vote event listener
 */
export default socket =>
    // TODO
    // Vote
    async (username, author) => {
        const r = await Article.findOne({
            user: author ?? ""
        });
        if (!r) {
            socket.emit("failed");
            return;
        }
        // If another user votes
        if (r.user !== username) 
            await Article.replaceOne(r, {
                user: r.user,
                name: r.name,
                content: r.content,
                display_img: r.display_img,
                description: r.description,
                views: r.views,
                tag: r.tag,
                votes: r.votes + 1
            });
    };