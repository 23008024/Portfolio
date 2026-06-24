const express = require("express");
const router = express.Router();

const { Resend } = require("resend");

const resend = new Resend(process.env.RESEND_API_KEY);


router.post("/", async (req, res) => {

    console.log("BODY RECEIVED:", req.body);


    try {

        const {
            name,
            email,
            company,
            message
        } = req.body;


        if (!name || !email || !message) {

            return res.status(400).json({
                success:false,
                message:"Name, email and message are required"
            });

        }


        console.log("Sending email...");


        const result = await resend.emails.send({

            from: "Portfolio <onboarding@resend.dev>",

            to: process.env.EMAIL_USER,

            reply_to: email,

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


        console.log("EMAIL SENT:", result);


        return res.json({

            success:true,

            message:"Message sent successfully"

        });


    } catch(error) {


        console.error("EMAIL ERROR:", error);


        return res.status(500).json({

            success:false,

            message:"Failed to send email",

            error:error.message

        });

    }

});


module.exports = router;
