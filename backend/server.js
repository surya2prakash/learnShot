const express = require("express");
const cors = require("cors");
const cloudinary = require("./configFiles/cloudinary");
const database = require("./configFiles/database");

// express ---->
const app = express();

// json-parser
app.use(express.json());

// dotenv ---->
require("dotenv").config();

// port from env
const PORT = process.env.PORT || 8000 

// database and cloudinary ---->
database();
cloudinary();


// listen --->
app.listen(PORT,()=>{
      console.log(`App is listen at ${PORT} 🌎`);
});

app.get("/",(req,res)=>{
       res.send(`<div>Welcome to backend.</div>`)
});