const express = require("express");
const router = express.Router();
const prisma = require("../config/db");

// Track opened (clicked Hire Me)
router.post("/", async (req, res) => {

  const { type } = req.body;

  try {

    res.json({
      success: true,
      message: "Track recorded",
      type
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