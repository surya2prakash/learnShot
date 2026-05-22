const User = require("../../model/user");
const Course = require("../../model/course");
const CourseProgress = require("../../model/courseProgress");
const Profile = require("../../model/profile");
const mongoose = require("mongoose");

exports.deleteaccount = async(req,res) =>{
       try{

        const id = req.user.id ;

        // check is user doc -->

        const isExist = await User.findById(id);

        if(!isExist){
             return res.status(404).json({
                  success:false,
                  message:"User Not Found."
             });
        };

        // now delete profile 

       const isProfileDelete = await Profile.findByIdAndDelete({_id: new mongoose.Types.ObjectId(isExist?.profileId)});
           
         if(!isProfileDelete){
              return res.status(404).json({
                  success:false,
                  message:"Profile Not found."
              })
         };

        //  now delete the course --->
        
        for(const course_id of courses){
               await Course.findByIdAndUpdate(course_id,{
                  $pull:{studentEnrolled:id}
               },{new:true});
        };

        // delete the Course-Progression --->
        await CourseProgress.deleteMany({userId:id});
        //  now delete the user -->
        await User.findByIdAndDelete(id);

         
        return res.status(200).json({
              success:true,
              message:"Account Delete."
        })

       }catch(err){
          console.error(err);
          return res.status(500).json({
              success:false,
              message:"Error While Deleting Account. Try Again."
          })
       }
}