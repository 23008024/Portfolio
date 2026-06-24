const express = require("express");
const router = express.Router();

const nodemailer = require("nodemailer");


// Gmail transporter
const transporter = nodemailer.createTransport({

    host: "smtp.gmail.com",

    port: 587,

    secure: false,

    auth: {

        user: process.env.EMAIL_USER,

        pass: process.env.EMAIL_PASS

    },

    family: 4

});

console.log("EMAIL_USER:", process.env.EMAIL_USER);
console.log("EMAIL_PASS EXISTS:", !!process.env.EMAIL_PASS);


// Check Gmail connection when server starts
transporter.verify((error, success) => {

    if (error) {

        console.error("GMAIL CONNECTION ERROR:", error.message);

    } else {

        console.log("GMAIL SERVER READY");

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

                success: false,

                message: "Name, email and message are required"

            });

        }



        console.log("Sending email...");



        const info = await transporter.sendMail({


            from: process.env.EMAIL_USER,


            to: process.env.EMAIL_USER,


            replyTo: email,


            subject: "New Portfolio Contact Message",



            html: `

                <h2>New Contact Message</h2>


                <p>
                    <strong>Name:</strong> ${name}
                </p>


                <p>
                    <strong>Email:</strong> ${email}
                </p>


                <p>
                    <strong>Company:</strong> ${company || "N/A"}
                </p>


                <p>
                    <strong>Message:</strong>
                </p>


                <p>
                    ${message}
                </p>

            `

        });



        console.log("EMAIL SENT:", info.messageId);



        return res.status(200).json({

            success: true,

            message: "Message sent successfully"

        });



    } catch (error) {


        console.error("EMAIL ERROR:", error);



        return res.status(500).json({

            success: false,

            message: "Failed to send email",

            error: error.message

        });


    }


});



module.exports = router;
