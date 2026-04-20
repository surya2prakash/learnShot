const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema({
    // DOB -->
       dateOfBirth:{
         type:Date,
         
       },
    //    about user --->
       about:{
         type:String,
         trim:true
       },
    //  gender --->  
       gender:{
         type:String,
         
       },
    //    contact number --->
       contactNumber:{
           type:Number
       }
},{timestamps:true});


module.exports = mongoose.model("Profile",profileSchema);