const Section = require("../../model/section");
const SubSection = require("../../model/subSection");


exports.deletesubsection = async(req,res) =>{
      try{
           
        //  for deleting the sub section -> pull the sub section from the section and then delete the sub section -> 
        const {sectionId,subSectionId}=req.body;
           
            if(!sectionId || !subSectionId){
                  return res.status(400).json({
                     success:false,
                     message:"Id is missing."
                  })
            };

            // pull sub section from section 

            const isPulled = await Section.findByIdAndUpdate(sectionId,{$pull:{subSectionsId:subSectionId}},{new:true});

            const isRemoved = await SubSection.findByIdAndDelete(subSectionId);

            const latestSection = await Section(sectionId);

            return res.status(200).json({
                  success:true,
                  message:"Sub-Section Removed.",
                  data:latestSection
            })

      }catch(err){
           console.error(err);
           return res.status(500).json({
              success:false,
              message:"Error while Deleting Sub-Section,Try again."
           })
      }
}