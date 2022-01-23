import app from "../../app/loaders/express.mjs";
import next from "../../app/loaders/next.mjs";
import Article from "../../app/models/article.mjs";

// Edit articles
// https://localhost/article/edit
app.get("/article/edit/:name", async (req, res) => {
    // Get data
    const { display_img, content, user } = await Article.findOne({
        name: req.params?.name ?? "",
        user: req.session?.userID ?? ""
    }) ?? {};
    // Check whether the current user is the author
    return user
        // Render the page
        ? next.render(req, res, "/edit", {
            name: req.params?.name,
            image_url: display_img
                ? display_img 
                : "Display image url",
            md_content: content ?? ""
        })
        // Redirect to login page
        : res.redirect("/login");
});

// Create articles
// https://localhost/article/new
app.get("/article/new",
    async (req, res) =>
        req.session?.userID
            ? next.render(req, res, "/create")
            : res.redirect("/article")
);