const SubSection = require("../../model/subSection");
const Section = require("../../model/section");

const {uploadToCloudinary} = require("../../utility/uploadToCloudinary");



require("dotenv").config();
exports.createsubSection = async(req,res) =>{
      try{
           const {title,description,sectionId} = req.body;

           
            
           const video = req.files.videoFile ;

           console.log("video -->",video);

           if(!title || !description){
               return res.status(400).json({
                 success:false,
                 message:"Title and discription field required."
               });
           };

         

           if(!video || !req.files){
              return res.status(400).json({
                 success:false,
                 message:"Video file required."
              });
           };

        //check section --->
        
        const isSectionExist = await Section.findById(sectionId);

        if(!isSectionExist){
              return res.status(404).json({
                 success:false,
                 message:"Section Not found."
              });
        };
         
        //now upload video to cloudinary -->
          
        const uploadVideo = await uploadToCloudinary(video,process.env.VIDEO_FOLDER);

        console.log(uploadVideo);

        const newSubSection = new SubSection({
                   title:title,
                   description:description,
                   videoUrl:uploadVideo?.secure_url,
                   timeDuration:`${uploadVideo?.duration}`
        })

           await newSubSection.save();

        const updatedSection =  await Section.findByIdAndUpdate(sectionId,{$push:{subSectionsId:newSubSection?._id}},{new:true}).populate({model:"SubSection" , path:"subSectionsId"});
   
          return res.status(201).json({
              success:true,
              message:"Sub-Section Created.",
              data:updatedSection
          })


      }catch(err){
          console.error(err);

          return res.status(500).json({
             success:false,
             message:"Error while Creating Sub-Section.Try again."
          })
      }
}