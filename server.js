require("dotenv").config();

const express = require("express");
const cors = require("cors");

const app = express();


app.use(cors());

app.use(express.json());


// Applications route
app.use(
    "/applications",
    require("./routes/applications")
);


// AI analysis route
app.post("/analyse", (req, res) => {

    const { message } = req.body;

    res.json({
        analysis: `Application received. Message length: ${message?.length || 0} characters.`
    });

});


// Test route
app.get("/", (req, res) => {

    res.send("API running");

});


const PORT = process.env.PORT || 5000;


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
