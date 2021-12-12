import mongoose from "mongoose";
import nodemailer from "nodemailer";
import { config } from "dotenv";
// Register mongoose models
import "../models/article.mjs";
import "../models/user.mjs";

// Load ENV
config();

// Server port
export const port = Number(process.env.PORT) || 443;

// Server name
export const hostname = process.env.LAN_IP || "0.0.0.0";

// Database URL
export const url = process.env.DB_URL;

// Connection settings
/**
 * @type {import("mongoose").ConnectOptions}
 */
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
 * @param {{name: string, content: string, views: number, author: string, votes: number}[]} articles list
 */

export const InitCategory = (ct, articles) => {
    if (articles.length < 2)
        return articles;
    const
        pivotIndex = articles.length - 1,
        pivot = articles[pivotIndex],
        /**
         * @type {{name: string, content: string, views: number, author: string, votes: number}[]}
         */
        left = [],
        /**
         * @type {{name: string, content: string, views: number, author: string, votes: number}[]}
         */
        right = [];

    for (let i = 0; i < pivotIndex; i++)
        (articles[i][ct] < pivot[ct] ? right : left).push(articles[i]);

    return [...InitCategory(ct, left), pivot, ...InitCategory(ct, right)];
}
