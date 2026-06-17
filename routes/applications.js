const express = require("express");
const router = express.Router();

const prisma = require("../prisma/client");


router.post("/", async (req, res) => {

    try {

        const lead = await prisma.lead.create({
            data:{
                name:req.body.name,
                email:req.body.email,
                company:req.body.company,
                message:req.body.message,
                analysis:req.body.analysis
            }
        });


        res.json({
            success:true,
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