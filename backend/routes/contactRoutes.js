const express = require("express");
const router = express.Router();

const { PrismaClient } = require("@prisma/client");
const nodemailer = require("nodemailer");

const prisma = new PrismaClient();

// Gmail transporter
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

router.post("/", async (req, res) => {

    console.log("BODY RECEIVED:", req.body);

    try {

        const {
            name,
            email,
            company,
            message
        } = req.body;

        // Save to PostgreSQL
        const lead = await prisma.lead.create({
            data: {
                name,
                email,
                company,
                message
            }
        });

        // Send email notification
        const info = await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: process.env.EMAIL_USER, // receive in your own inbox
            subject: "New Contact Form Submission",
            html: `
                <h2>New Contact Message</h2>

                <p><strong>Name:</strong> ${name}</p>

                <p><strong>Email:</strong> ${email}</p>

                <p><strong>Company:</strong> ${company || "N/A"}</p>

                <p><strong>Message:</strong></p>

                <p>${message}</p>
            `
        });

        console.log("Email sent:", info.messageId);

        res.status(200).json({
            success: true,
            message: "Message sent successfully",
            lead
        });

    } catch (error) {

        console.error("ERROR:", error);

        res.status(500).json({
            success: false,
            message: "Failed to process contact form",
            error: error.message
        });

    }

});

module.exports = router;