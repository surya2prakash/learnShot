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
          trim:true
      },
    //   password --->
      password:{
          type:String,
          required:true,
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
    ]


     },
    // timeStamps for when doc is created and modified --> save
    {timestamps:true}
);

module.exports = mongoose.model("User",userSchema);