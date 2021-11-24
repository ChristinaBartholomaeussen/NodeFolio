import express from "express";
import { connection } from "../database/connectSqlite.js";
import bcrypt from "bcrypt";
import { createPage } from "../render.js";
import { authRateLimiter } from "../rateLimiter.js";

const authRouter = express.Router();
const loginPage = createPage("login/login.html");

authRouter.get("/", (req, res) => {
    res.send(loginPage);
});

authRouter.post("/login", authRateLimiter, async (req, res) => {

    const remaining = req.rateLimit.remaining;

    let sess = req.session;

    const user = await connection.get(`SELECT * FROM admins where user = '${req.body.user}'`);

    if (user !== undefined) {

        const isCorrect = await bcrypt.compare(req.body.password, user["password"]);

        if (!isCorrect && remaining !== 0) {
            return res.status(500).send();
        };

        sess.user = user["user"];
        return res.status(200).send();
    }
    
    if (remaining === 0 && user === undefined) {
        return res.status(429).send();
    }

    return res.status(500).send();

    
    
});

export { authRouter }