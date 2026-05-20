const Section = require("../../model/section");
const SubSection = require("../../model/subSection");
const Course = require("../../model/course");



exports.deletesection = async(req,res) =>{
      try{

        const {sectionId ,courseId} = req.body ;
         
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

            // pull the sectionId from the course ->

            const isPulledSection = await Course.findById(courseId,{$pull:{sections:sectionId}},{new:true});

            // now  the section -->
              const findSection = await Section.findById(sectionId);

            //   delete all subsection associated with this section -->

               const removeSubSection = await SubSection.deleteMany({_id:{$in:findSection.subSectionsId}});

            //    now delete the section --->
                const removeSection =await Section.findByIdAndDelete(sectionId);

                const updatedCourse = await Course.findById(courseId);

                return res.status(200).json({
                     success:true,
                     message:"Section Removed.",
                     data:updatedCourse
                })

      }catch(err){
          console.error(err);
          return res.status(500).json({
              success:false,
              message:"Error while Deleting the Section, Try Again."
          })
      }
}