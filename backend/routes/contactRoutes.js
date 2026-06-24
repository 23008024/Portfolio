const express = require("express");
const router = express.Router();

const nodemailer = require("nodemailer");


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


        if (!name || !email || !message) {

            return res.status(400).json({

                success:false,

                message:"Name, email and message are required"

            });

        }


        console.log("Sending email...");


        await transporter.sendMail({

            from: process.env.EMAIL_USER,

            to: "mudaunaftali@gmail.com",

            replyTo: email,

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


        console.log("EMAIL SENT SUCCESSFULLY");


        res.json({

            success:true,

            message:"Message sent successfully"

        });


    } catch(error) {


        console.error("EMAIL ERROR:", error);


        res.status(500).json({

            success:false,

            message:error.message

        });

    }


});


module.exports = router;
