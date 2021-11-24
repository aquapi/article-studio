import mongoose from "mongoose";
import nodemailer from "nodemailer";
// Register mongoose models
import "../models/article.mjs";
import "../models/user.mjs";

// Server port
export const port = process.env.PORT || 443;

// Server name
export const hostname = process.env.HOST || "0.0.0.0";

// Database URL
export const url = process.env.DB_URL;

// Connection settings

export const settings = {
    useNewUrlParser: true,
    useUnifiedTopology: true
};

// Database models

export const DB = {
    users: mongoose.model("User"),
    sites: mongoose.model("Site")
}

// Email sender

export const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
    }
});

// Templates

/**
 * @param {{name: string, display_img: string, tag: string, description: string, user: string, views: number, content: string, votes: number}} i Article data
 * @returns rendered div
 */

export const ArticleTemplate = (i) => {
    return `
        <div class="created">
            <div id="${i.name}" style="display: flex; flex-direction: column; justify-content: center; overflow: hidden; max-height: 480.63px" class="${i.tag}">
                <img src="${i.display_img && i.display_img !== "undefined" && i.display_img !== "Display image url" ? i.display_img : "images/image-icon.jpg"}" height="150px" width="276px" onerror="this.src = 'images/image-icon.jpg'">
                <h3>${i.name.length <= 21 ? i.name : i.name.slice(0, 21) + "..."}</h3>
                <div style="max-width: 250px; text-align: ${i.description.length <= 110 ? "justify" : "left"}; font-size: 13px;" class="article-content">
                    ${i.description && i.description !== "undefined" ? (i.description.length <= 70 ? i.description : i.description.slice(0, 67) + "...") :
            "Lorem ipsum dolor sit amet, consectetur adipiscing \
                    elit, sed do eiusmod..."}
                </div>
            </div>
        </div>
    `;
};

/**
 * @param {{name: string}} i Article data
 * @returns rendered click listener script of articles div
 */

export const ScriptTemplate = (i) => {
    return `
        document.getElementById(\`${i.name}\`).addEventListener("click", () => {
            location.replace(\`/reader/${encodeURIComponent(i.name)}\`);
        });
    `;
};

/**
 * @param {string} name header name
 * @returns rendered header
 */

export const Header = (name) => {
    return `
        <h2 style="font-family: Oxygen" id="header-name">${name}</h2>
        <hr style="width: 10%">
    `;
}

/**
 * @param {string} ct category name
 * @param {Response<any, Record<string, any>, number>} res to write the result to the client
 * @param {any[]} articles list
 */

export const InitCategory = (ct, res, articles) => {
    const length = articles.length;
    for (let i = 0; i < length; i++) {
        let mostViewsIndex = 0;
        let currentMost = Number.MIN_VALUE;
        let index = 0;
        for (let e of articles) {
            if (e[ct] > currentMost) {
                mostViewsIndex = index;
                currentMost = e[ct];
            }
            index++;
        }
        res.write(articles[mostViewsIndex].content);
        articles.splice(mostViewsIndex, 1);
    }
}

/**
 * @param {session.Session & Partial<session.SessionData>} Csession current session
 * @param {string} headerName current header
 * @returns rendered scripts
 */

export const EndScript = (Csession, headerName) => {
    return `
    <script>
    document.querySelector("#new").addEventListener("click", () => {
        location.replace("/article/new");
    });
    $(".wait").css("display", "block");
    $("#created-article").css("display", 'flex');
    $("body").css("display", 'block');
    $("#sign").click(() => {
        ${!Csession.userID ? "location.replace('/signup');" : "location.replace('/article/profile');"}
    });
    </script>
    <script>
        $("body").scrollTop();  
        $("input[type=text]").keyup(() => {
            document.querySelector("#header-name").innerHTML = $("input[type=text]").val() ? "Search Result" : "${headerName}";
            let count = 0, haveResult = false;
            for (let e of $("#created-article").children("div").toArray()) {
                let el = e.querySelector("div");
                if (!$("input[type=text]").val() || contain(el.id.toLowerCase(), $("input[type=text]").val().toLowerCase()) || contain(el.className.toLowerCase(), $("input[type=text]").val().toLowerCase())) {
                    e.style.display = "block";
                    count++;
                    haveResult = true;
                } else 
                    e.style.display = "none";
            }
            if (count > 4) 
                document.querySelector("#created-article").style["justify-content"] = "flex-start";
            else 
                document.querySelector("#created-article").style["justify-content"] = "center";
        })
    </script>
    </body></html>
    `;
}

/**
 * Check whether user is logged in and init "My article" and "Other article" buttons
 * @param {Response<any, Record<string, any>, number>} res to write result to client
 * @param {session.Session & Partial<session.SessionData>} Csession current session
 */

export const InitLoginScreen = (res, Csession) => {
    if (!Csession.userID)
        res.write(`</div><script>
            document.querySelector("#new").style.display = "none";
        </script>`)
    else {
        res.write(`</div><script>
            document.querySelector("#sign").innerHTML = "PROFILE";
            document.querySelector("#login").style.display = "none";
        </script>`)
    }
}

/**
 * @param {boolean} login 
 * @returns rendered lists of sorted articles by category
 */

export const SortByComponent = (login = false) => {
    return `
        <div id="sort">
            <div class="list">Discover</div>
            <div class="list">Most Voted</div>
            ${login ? "<div class='list'>My Article</div><div class='list'>Other Article</div>" : ""}
            <script>
                document.querySelectorAll(".list").forEach((e, i) => {
                    if (i === 0)
                        e.addEventListener('click', () => {
                            location.replace("/article");
                        });
                    else if (i === 1)
                        e.addEventListener('click', () => {
                            location.replace("/mostvote");
                        });
                    else if (i === 2)
                        e.addEventListener('click', () => {
                            location.replace("/myarticle");
                        });
                    else if (i === 3)
                        e.addEventListener('click', () => {
                            location.replace("/otherarticle");
                        });
                });
            </script>
        </div>
    `
}