const mongoose = require("mongoose") ;


const userSchema = new mongoose.Schema(
    {
        // user name  --->
      firstName:{
          type:String,
          required:true,
          trim:true
      },
      lastName:{
         type:String,
         required:true,
         trim:true
      },
    //   user email ---->
      email:{
          type:String,
          required:true,
          trim:true,
          toLowerCase:true
      },
    //   password --->
      password:{
          type:String,
          required:true,
          trim:true,
          select:false
      },
    //  image-url --->
      image:{
          type:String,
          trim:true
      },
    //   account types ---> "Admin","Instructor","Student"
      accountType:{
          type:String,
          enum:["Admin","Instructor","Student"],
          required:true
      },
    //    profile Id of user --->
    profileId:{
         type:mongoose.Schema.Types.ObjectId,
         ref:"Profile"
    },

    // instructor may have one or more courses --->
    courses:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Course"
        }
    ],
    
    // user course-progress --> 
      courseProgress:[{
          type:mongoose.Schema.Types.ObjectId,
          ref:"CourseProgress"
      }],

      approved:{
         type:Boolean,
         default:true
      },

      token:{
          type:String
      },
      resetPasswordExpire:{
          type:Date
      }
      
     },
    // timeStamps for when doc is created and modified --> save
    {timestamps:true}
);

module.exports = mongoose.model("User",userSchema);