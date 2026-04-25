const mongoose = require("mongoose");


const courseProgressSchema = new mongoose.Schema({
    //    course - ID --->
     courseId:{
          type:mongoose.Schema.Types.ObjectId,
          ref:"Course",
          required:true
     },
    //  user Id ---> 
    userId :{
          type:mongoose.Schema.Types.ObjectId,
          ref:"User",
          required:true
    },
    // ref of subsection --->
    completedVideos:[
        {
              type:mongoose.Schema.Types.ObjectId,
              ref:"SubSection",
              
        }
    ]
},{timestamps:true});

module.exports = mongoose.model("CourseProgress",courseProgressSchema);