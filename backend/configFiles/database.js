const mongoose = require("mongoose");

require("dotenv").config();

const dbConnect = async()=>{
     

    
     await mongoose.connect(process.env.DB_URL).then(()=>{
          console.log("DATABASE Connected 🎉");
     }).catch((err)=>{
          console.error(err.message);
          process.exit(1);
     })

};

module.exports = dbConnect ;