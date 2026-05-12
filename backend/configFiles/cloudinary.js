const cloudinary = require("cloudinary").v2 ;

require("dotenv").config();

const cloudinaryStore = ()=>{
         cloudinary.config({
            api_key:process.env.CLOUD_API_KEY ,
            api_secret:process.env.CLOUD_API_SECRET,
            cloud_name:process.env.CLOUD_NAME
         }); 
};

module.exports = cloudinaryStore ;