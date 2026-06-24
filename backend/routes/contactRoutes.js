const express = require("express");
const router = express.Router();

const nodemailer = require("nodemailer");


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


        console.log("Sending email...");


        const info = await transporter.sendMail({

            from: process.env.EMAIL_USER,

            to: process.env.EMAIL_USER,

            subject: "New Portfolio Contact Message",

            html: `

                <h2>New Contact Message</h2>

                <p><b>Name:</b> ${name}</p>

                <p><b>Email:</b> ${email}</p>

                <p><b>Company:</b> ${company || "N/A"}</p>

                <p><b>Message:</b></p>

                <p>${message}</p>

            `

        });


        console.log("Email sent:", info.messageId);


        res.status(200).json({

            success: true,

            message: "Message sent successfully"

        });


    } catch(error) {


        console.error("EMAIL ERROR:", error);


        res.status(500).json({

            success:false,

            message:"Failed to send email",

            error:error.message

        });

    }

});


module.exports = router;
