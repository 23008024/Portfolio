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

                success: false,

                message: "Name, email and message are required"

            });

        }


        console.log("Sending email...");


        const result = await resend.emails.send({

            // Resend testing sender
            from: "Portfolio <onboarding@resend.dev>",

            // Your Gmail inbox
            to: "mudaunaftali@gmail.com",

            // Visitor email
            reply_to: email,


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


        if (result.error) {

            console.error("RESEND ERROR:", result.error);

            return res.status(500).json({

                success: false,

                message: result.error.message

            });

        }


        console.log("EMAIL SENT:", result.data);


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
