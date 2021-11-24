import express from "express";
import { createPage } from "../render.js";

const adminRouter = express.Router();

const createProjectPage = createPage("admin/createProject.html", {
    title: "Admin | Projects"
});

const editDeletePage = createPage("admin/projects.html", {
    title: "Admin | Create New"
});

adminRouter.get("/", (req, res) => {
    if (req.session.user) {
        return res.send(editDeletePage);
    }
    return res.redirect("/auth");
});

adminRouter.get("/project", (req, res) => {
    if (req.session.user) {
        return res.send(createProjectPage);
    }
    return res.redirect("/auth");
});

export { adminRouter };