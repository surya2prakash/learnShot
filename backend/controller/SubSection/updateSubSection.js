const SubSection = require("../../model/subSection");
const Section = require("../../model/section");
const cloudinary = require("../../utility/uploadToCloudinary");


require("dotenv").config();

exports.updatesubsection = async(req,res) =>{
       try{
            // for update a sub section we need ,section -> Id ,subsection Id and content that will update ->
            
            const {sectionId,subSectionId,title,description} = req.body ;

        
                
           const subsection = await SubSection.findById(subSectionId);

        // if subsection not found in db then -->
        
        if(!subsection){
              return res.status(404).json({
                  success:false,
                  message:"Sub-Section Not Found"
              })
        };

        if(title !== undefined){
            //   this means update the title
            subsection.title =title ;
        }

        if(description !== undefined){
               subsection.description = description ;
        }

        // and the last one if user want to update the video then 

        if(req.files && req.files.videoFile !== undefined){
                  const video = req.files.videoFile ;
                const updateVideo = await uploadToCloudinary(video,process.env.VIDEO_FOLDER);  

                subsection.videoUrl = updateVideo?.secure_url,
                subsection.timeDuration =`${updateVideo?.duration}`
        }
             
        await subsection.save();

        const section = await Section.findById(sectionId).populate({
                path:"subSectionsId",
                model:"SubSection"
        });

        return res.status(200).json({
               success:true,
               message:"Updated Successfully.",
               data:section
        })

       }catch(err){
          console.error(err);
          return res.status(500).json({
             success:false,
             message:"Error while updating the Sub Section,Try again."
          })
       }
}