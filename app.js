import express from "express";
import { urlencoded } from "express";
import helmet from "helmet";
import path from 'path';
import { authRouter } from "./routers/auth.js";
import { projectRouter } from "./routers/projects.js";
import { contactRouter } from "./routers/contact.js";
import { adminRouter } from "./routers/admin.js";
import { cvRouter } from "./routers/myCV.js";
import session from "express-session";
import { createPage }  from "./render.js";

const app = express();

app.use(express.static("public"));
app.use(helmet());
app.use(express.json());
app.use(urlencoded({extended : true}));

const __dirname = path.resolve();
app.use('/js', express.static(__dirname + '/node_modules/bootstrap/dist/js'));
app.use('/dist', express.static( __dirname + '/node_modules/jquery/dist'));
app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css'));
app.use('/build', express.static(__dirname + '/node_modules/toastr/build'));
app.use('/build', express.static(__dirname + '/node_modules/toastr/build'));

app.use(session({
    secret: 'blabla', 
    saveUninitialized: true,
    resave: true
}));

app.use("/auth", authRouter);
app.use("/admin", adminRouter);
app.use("/contact", contactRouter);
app.use("/projects", projectRouter);
app.use("/cv", cvRouter);

const frontpagePage = createPage("frontpage/frontpage.html", { 
    title: "Nodefolio | Welcome "
});
app.get("/", (req, res) => {
    res.send(frontpagePage);
});

const PORT = process.env.PORT = 3000;

app.listen(PORT, (error) => {
    console.log("Server is running on port", PORT);
});