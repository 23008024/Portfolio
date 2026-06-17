const express = require("express");
const router = express.Router();
const prisma = require("../config/db");

// Track opened (clicked Hire Me)
router.post("/", async (req, res) => {

  const { type, name, company, email, message, analysis } = req.body;

  try {

    const event = await prisma.hireMeEvent.create({
      data: {
        type,
        name,
        company,
        email,
        message,
        analysis
      }
    });

    res.json({
      success: true,
      event
    });

  } catch (err) {

    console.error(err);

    res.status(500).json({
      error: "Failed to track event"
    });

  }

});


// Get all events for dashboard
router.get("/events", async (req, res) => {

  if (!req.session?.user) {
    return res.status(401).json({
      error: "Unauthorised"
    });
  }

  try {

    const events = await prisma.hireMeEvent.findMany({
      orderBy: {
        createdAt: "desc"
      }
    });

    res.json(events);

  } catch (err) {

    res.status(500).json({
      error: "Failed to fetch events"
    });

  }

});


module.exports = router;