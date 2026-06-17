const express = require("express");
const router = express.Router();

const prisma = require("../prisma/client");
const nodemailer = require("nodemailer");


const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});


router.post("/", async (req, res) => {

    try {

        const { name, email, company, message, analysis } = req.body;

res.json({
    success:true,
    success: true,
    lead
});


        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: process.env.EMAIL_TO,
            subject: "New Portfolio Hire Me Request",
            text: `
New application received.

Name: ${name}
Email: ${email}
Company: ${company || "Not provided"}

Message:
${message}
            `
        });


        res.json({
            success: true,
            lead
        });


    } catch(error){

        console.log(error);

        res.status(500).json({
            error:"Failed to save application"
        });

    }

});


module.exports = router;