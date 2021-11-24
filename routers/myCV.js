import express from "express";
import { createPage } from "../render.js";

const cvRouter = express.Router();

const CVPage = createPage("CVPage/CVPage.html", {
    title: "My CV"
});

cvRouter.get("/", (req, res) => {
    res.send(CVPage);
});

export { cvRouter }