const express = require("express");
const router = express.Router();

const nodemailer = require("nodemailer");


const transporter = nodemailer.createTransport({

    host: "smtp.gmail.com",

    port: 587,

    secure: false,

    family: 4,

    auth: {

        user: process.env.EMAIL_USER,

        pass: process.env.EMAIL_PASS

    }

});


// Test Gmail connection

transporter.verify((error)=>{

    if(error){

        console.log("GMAIL ERROR:", error.message);

    } else {

        console.log("GMAIL READY");

    }

});



router.post("/", async(req,res)=>{


    console.log("BODY RECEIVED:", req.body);


    try{


        const {
            name,
            email,
            company,
            message
        } = req.body;



        await transporter.sendMail({

            from: process.env.EMAIL_USER,

            to: "mudaunaftali@gmail.com",

            replyTo: email,

            subject:"Portfolio Contact Message",

            html:`

            <h2>New Message</h2>

            <p><b>Name:</b>${name}</p>

            <p><b>Email:</b>${email}</p>

            <p><b>Company:</b>${company}</p>

            <p><b>Message:</b>${message}</p>

            `

        });



        console.log("EMAIL SENT");


        res.json({

            success:true

        });



    }catch(error){


        console.log("SEND ERROR:",error);


        res.status(500).json({

            success:false,

            error:error.message

        });

    }


});


module.exports = router;

