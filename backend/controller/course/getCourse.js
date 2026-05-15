const Course = require("../../model/course");



exports.allCourse = async(req,res) =>{
      try{
        // all course means -> the courses which are published 

        const getAllCourse = await Course.find({status:'Published'},{
              courseName:true,
              instuctorId:true,
              price:true,
              thumbnail:true,
              ratingAndReviews:true,
              studentEnrolled:true
        });

        if(getAllCourse.length !== 0){
              return res.status(200).json({
                  success:true,
                  message:"All Courses.",
                  data:getAllCourse
              });
        };

        return res.status(404).json({
              success:false,
              message:"Not Course Available."
        });

      }catch(err){
          console.error(err);
          return res.status(500).json({
               success:false,
               message:"Intenal Server Error."
          })
      }
};


//  get single course with details --->

exports.singleCourse = async(req,res) =>{
      try{

         const {courseId} = req.body ;

         if(!courseId){
              return res.status(400).json({
                  success:false,
                  message:"CourseId Missing."
              });
         };

        //  now find that course 

        const isCourseExist = await Course.findById(courseId);
                
        if(!isCourseExist){
              return res.status(404).json({
                  success:false,
                  message:"Course not Found."
              });
        };

        return res.status(200).json({
              success:true,
              message:"Course Found.",
              data:isCourseExist
        })


      }catch(err){
          console.error(err);
          return res.status(500).json({
              success:false,
              message:"Internal Server Error."
          })
      }
}