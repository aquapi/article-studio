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

export const errHandler = err => {
    if (err) throw err;
}

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

export const InitCategory = (ct, articles) => {
    const length = articles.length;
    const sorted = [];
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
        sorted.push(articles[mostViewsIndex]);
        articles.splice(mostViewsIndex, 1);
    }
    return sorted;
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
            <script src="/javascripts/homepage/collections.js"></script>
        </div>
    `
}