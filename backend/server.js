require("dotenv").config();


const express = require("express");

const cors = require("cors");



const app = express();



app.use(cors());


app.use(express.json());



console.log("Loading routes...");
const contactRoutes = require("./routes/contactRoutes");
console.log("Routes loaded successfully");



app.use("/api/contact", contactRoutes);



app.get("/",(req,res)=>{


    res.send("Taskflow API Running 🚀");


});
const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
});


server.on("error", (error) => {
    console.error("SERVER ERROR:", error);
});


server.on("listening", () => {
    console.log("Server is actually listening");
});
