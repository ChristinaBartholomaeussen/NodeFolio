import express from "express";
import { connection } from "../database/connectSqlite.js";
import { createPage } from "../render.js";

const projectRouter = express.Router();
const projectsPage = createPage("projects/projects.html");

projectRouter.get("/", async (req, res) => {
    res.send(projectsPage);
    
});

projectRouter.get("/api", async (req, res) => {
    const projects = await connection.all("SELECT * FROM projects");
    res.send({ projects });
});

projectRouter.post("/api", async (req, res) => {
    const projectToCreate = req.body;
    for (let p in projectToCreate) {
        if (projectToCreate[p] === '') {
            return res.status(500).send();
        }
    }
    connection.run(
        `INSERT INTO projects ('title', 'technologies', 'description', 'link')
        VALUES (?, ?, ?, ?)`,
        [projectToCreate.title,
        projectToCreate.technologies, projectToCreate.description,
        projectToCreate.link]);
    return res.status(201).send();
});

projectRouter.delete("/api/:id", async (req, res) => {
    connection.run(`DELETE FROM projects where project_id = ${req.params.id}`)
    res.status(200).send();
});

projectRouter.patch("/api/:id", async (req, res) => {
    for (let p in req.body) {
        if (req.body[p] === '') {
            return res.status(500).send();
        }
    }
    connection.run(`UPDATE projects SET 
        title = '${req.body.title}',
        technologies = '${req.body.technologies}', description = '${req.body.description}',
        link = '${req.body.link}' WHERE project_id = ${req.params.id}`);
    return res.status(200).send();
});

export { projectRouter };