const Course = require("../../model/course");
const courseProgress = require("../../model/courseProgress");
const convertSecToDuration = require("../../utility/secondToDuration/secToDuration")



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

        const isCourseExist = await Course.findById(courseId).populate({model:"Section",path:"sections",
            populate:{
                  model:"SubSection",
                  path:"subSectionsId"
            }
        });
                
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

exports.getInstructorCourses = async(req,res) =>{
        try{

             const instructorId = req.user.id ;

             if(!instructorId){
                   return res.status(400).json({
                        success:false,
                        message:"Id is missing."
                   })
             };

            // 
             const getAllInstructorCourse = await Course.find({instructorId:instructorId});

             return res.status(200).json({
                    success:true,
                    message:"Instructor All Course",
                    data:getAllInstructorCourse
             })

        }catch(error){
             return res.status(500).json({
                   success:false,
                   message:"Internal Server Error."
             })
        }
}



exports.getFullCourseDetails = async(req,res) =>{
         try{

            const {courseId} = req.body ;

            const userId = req.user.id ;


            const courseDetails = await Course.findOne({_id:courseId}).populate({
                  path:"instructorId",
                  model:"User",
                  populate:{
                        path:"profileId",
                        model:"Profile" 
                  }
            }).populate({
                  path:"categoryId",
                  model:"Category"
            }).populate({
                  path:"ratingAndReviews",
                  model:"RatingAndReviews"
            }).populate({
                   path:"sections",
                   model:"Section",
                   populate:{
                        path:"subSectionsId",
                        model:"SubSection"
                   }
            }).exec();

            const courseProgressCount = await courseProgress.findOne({
                     courseId:courseId,
                     userId:userId 
            });

            if(!courseDetails){
               
                  return res.status(404).json({
                         success:false,
                         message:"Could not find the course with id ."
                  })
            };

            let totalDurationInSeconds = 0 ;

            courseDetails.sections.forEach((content)=>{
                   content.subSectionsId.forEach((subSection)=>{
                       const timeDurationInSeconds = parseInt(subSection?.timeDuration) ;

                          totalDurationInSeconds += timeDurationInSeconds
                   })
            })

                const totalDuration = convertSecToDuration(totalDurationInSeconds);

                 

                return res.status(200).json({
                    success:true,
                    message:"Course All details",
                    data:{
                           course:courseDetails,
                           totalDuration:totalDuration,
                           completedVideos:courseProgressCount?.completedVideos ? courseProgressCount?.completedVideos : []
                    }
                })
         }catch(error){
               console.error(error);

               return res.status(500).json({
                    success:false,
                    message:"Internal Server Error"
               })
         }
}