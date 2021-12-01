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
