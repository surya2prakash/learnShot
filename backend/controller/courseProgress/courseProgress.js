
const SubSection = require("../../model/subSection");
const Course = require("../../model/course");
const CourseProgress = require("../../model/courseProgress");


exports.updateCourseProgress = async(req,res) =>{
      try{

        const {courseId ,subSectionId} = req.body;

        const id = req.user.id ;

        if(!courseId || !subSectionId){
              return res.status(400).json({
                  success:false,
                  message:"Id is missing."
              });
        };

        // now 1st I check the course -> 

        const isUserExist = await Course.findById(courseId,{studentEnrolled:id});

        if(!isUserExist){
               return res.status(404).json({
                  success:false,
                  message:"Student Not Enrolled."
               });
        };

        //  now the couse progression is depend on student -> completed the video

        const isSubSection = await SubSection.findById(subSectionId);

        if(!isSubSection){
            return res.status(404).json({
                  success:false,
                  message:"SubSection Not found."
               });
        };

        // now check is student already complete this video -->

        const isCourseProgress = await CourseProgress.findOne({courseId:courseId,userId:id});

             if(!isCourseProgress){
                  return res.status(404).json({
                      success:false,
                      message:"Course Progress Not found."
                  });
             };

            //  if course Progress found of the user then --> check is sub section id is present or not

            if(isCourseProgress.completedVideos.includes(subSectionId)){
                //    that means this video already completed.
                return res.status(400).json({
                      success:false,
                      message:"This Sub-Section already Completed."
                })
            }else{
                //   push the sub id into the course progress.

                  isCourseProgress.completedVideos.push(subSectionId);
            };

          await  isCourseProgress.save();

          return res.status(200).json({
              success:true,
              message:"Course Progress Updated."
          })

            


      }catch(err){
          console.error(err);
          return res.status(500).json({
              success:false,
              message:"Internal Server Error."
          })
      }
}