const mongoose = require("mongoose");

const subSection = new mongoose.Schema(
     {
        // title -->
         title:{
             type:String,
             trim:true,
             required:true
         },
        //  description -->
         description:{
             type:String,
             trim:true,
             required:true
         },
        //  video duration --->
         timeDuration:{
              type:String,
              required:true
         },
        //  video url --->
         videoUrl:{
              type:String,
               required:true,
               trim:true
         }
     },{timestamps:true}
);

module.exports = mongoose.model("SubSection",subSection);