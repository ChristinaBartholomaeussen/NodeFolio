import express from "express";
import { createPage }  from "../render.js";
import nodemailer from "nodemailer";

const contactRouter = express.Router();

const contactPage = createPage("contact/contact.html", {
    title: "Contact"
});

contactRouter.get("/", (req, res) => {
    res.send(contactPage);
});

import dotenv from "dotenv";

contactRouter.post("/api", async (req, res) => {

    dotenv.config();

    for (let p in req.body) {
        if (req.body[p] === '') {
            return res.status(400).send();
        }
    }

    
    
    const transporter = nodemailer.createTransport({
        port: 465,
        host: "smtp.gmail.com",
        auth: {
            user: "c.m.bartholo@gmail.com",
            pass: process.env.NODEMAILER_PASS
        },
        secure: true,
    });

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