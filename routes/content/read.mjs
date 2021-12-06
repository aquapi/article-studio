import { DB } from "../../resource/resource.mjs";
import app from "../../app/config.mjs";
import next from "../../app/next.mjs";

let Csession;

// Read for client
app.get("/reader/:name", async (req, res) => {
    Csession = req.session;
    const r = await DB.sites.findOne({
        name: req.params?.name ?? ""
    });
    // If reader can't find target article
    if (!r) {
        res.redirect("/article");
        return;
    }
    // If another user visits the read site 
    if (r?.user !== Csession.userID)
        await DB.sites.replaceOne(r, {
            user: r.user,
            name: r.name,
            content: r.content,
            display_img: r.display_img,
            description: r.description,
            views: r.views + 1,
            tag: r.tag,
            votes: r.votes
        });
    // Render
    return next.render(req, res, "/article/read", {
        name: req.params.name,
        admin_button: `
                <button onclick='location.replace("/article/edit/${encodeURIComponent(r.name)}")' style="display: ${r.user === Csession.userID ? 'block' : 'none'};">Edit</button>
                <button style="display: ${r.user === Csession.userID ? 'block' : 'none'};" id="del">Delete</button>
                <button onclick='location.replace("/vote/${encodeURIComponent(r.name)}")' style="display: ${r.user === Csession.userID ? 'none' : 'block'};">Vote</button>
                `,
        content: r?.content ?? `This article have no content`,
        views: r.views,
        author: r.user,
        tag: r.tag,
        votes: r.votes
    });
});

// Vote
app.get("/vote/:name", async (req, res) => {
    Csession = req.session;
    const r = await DB.sites.findOne({
        name: req.params?.name ?? ""
    });
    if (!r) {
        res.redirect("/article");
        return;
    }
    if (r?.user !== Csession.userID) {
        await DB.sites.replaceOne(r, {
            user: r.user,
            name: r.name,
            content: r.content,
            display_img: r.display_img,
            description: r.description,
            views: r.views,
            tag: r.tag,
            votes: r.votes + 1
        });
    }
    res.redirect(`/reader/${encodeURIComponent(req.params.name)}`);
});