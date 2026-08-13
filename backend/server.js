const express = require("express");
const cors = require("cors");
const cloudinary = require("./configFiles/cloudinary");
const database = require("./configFiles/database");
const fileUpload = require("express-fileupload");
//const client = require("./configFiles/redisClient");
const userRoutes = require("./routes/user");
const courseRoutes = require("./routes/course");
const paymentRoute = require("./routes/payment");
const profileRoute = require("./routes/profile");


const cookieparser = require("cookie-parser")


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

app.use(fileUpload({
      useTempFiles:true,
      tempFileDir:"/tmp/"
}));

app.use(cookieparser());

app.use(cors({
    origin:"http://localhost:5173",
    methods:["POST","GET","DELETE","PATCH"],
    allowedHeaders:["Authorization","Content-Type","Accept"],
    credentials:true
}))

app.get("/",(req,res)=>{
       res.send(`<div>Welcome to backend.</div>`)
});

app.use("/api/v1",userRoutes);
app.use("/api/v1",courseRoutes);
app.use("/api/v1",paymentRoute);
app.use("/api/v1",profileRoute);

// listen --->

async function startServer() {
      //  await client.connect();
      app.listen(PORT,()=>{
      console.log(`App is listen at ${PORT} 🌎`);
});
};

startServer();



