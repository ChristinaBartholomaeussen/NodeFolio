import express from "express";
import { transporter } from "../nodemailer.js";
import { createPage }  from "../render.js";

const contactRouter = express.Router();

const contactPage = createPage("contact/contact.html", {
    title: "Contact"
});

contactRouter.get("/", (req, res) => {
    res.send(contactPage);
});

contactRouter.post("/api", async (req, res) => {
    for (let p in req.body) {
        if (req.body[p] === '') {
            return res.status(400).send();
        }
    }
    const mailOptions = {
        from: req.body.email,
        to: "c.m.bartholo@gmail.com",
        subject: "Nodefolio",
        html: 
        `<p><b>Name:</b> ${req.body.name} </p>
        <p><b>Email:</b> ${req.body.email} </p>
        <p><b>Phone:</b> ${req.body.phone} </p> 
        <p><b>Besked:</b> ${req.body.message} </p> `
    };

    transporter.sendMail(mailOptions, (error) => {
        if (error) {
            return res.status(error).send();
        }
        return res.status(200).send();
    });
});

export  {contactRouter};