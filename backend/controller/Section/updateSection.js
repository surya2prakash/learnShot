const Section = require("../../model/section");
const Course = require("../../model/course");


exports.updatesection = async(req,res) =>{
      try{

             const {courseId,sectionId,sectionName} = req.body ;
              
               if(!sectionId){
                  return res.status(400).json({
                     success:false,
                     message:"sectionId is missing."
                  })
              };

              if(!courseId){
                  return res.status(400).json({
                     success:false,
                     message:"courseId is missing."
                  })
              };

              if(sectionName !== undefined){
                      const checkSection = await Section.findByIdAndUpdate(sectionId,{sectionName:sectionName},{new:true}).exec();

                      const updatedCourse = await Course.findByIdAndUpdate(courseId).populate({
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

                      return res.status(200).json({
                           success:true,
                           message:"Section Updated.",
                           data:updatedCourse
                      })
              }
                
              return res.status(400).json({
                  success:false,
                  message:"For Update, updated Item is missing. "
              });

      }catch(err){
          console.error(err);
          return res.status(500).json({
              success:false,
              message:"Internal Server Error."
          })
      }
}