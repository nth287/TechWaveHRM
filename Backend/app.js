//pwd VCSfyobajKLxfUa8

const express = require("express");
const mongoose = require("mongoose");
const router = require("./Routes/UserRoutes")



const app = express();
const cors = require("cors");

//Middleware
app.use(express.json());
app.use(cors());
app.use("/users",router);



mongoose.connect("mongodb+srv://admin:VCSfyobajKLxfUa8@cluster0.7dnhz.mongodb.net/")
.then(()=> console.log("Connected to MongoDB"))
.then(() => {
    app.listen(5000, () => {
      console.log("Server running on port 5000");
    });
})
.catch((err)=> console.log((err)));