const Course = require("../../model/course");
const {uploadToCloudinary} = require("../../utility/uploadToCloudinary");

require("dotenv").config();



exports.editCourse = async(req,res) =>{
       try{

          const  updates = req.body ;

          

        //   updated 
                const courseId = updates?.courseId;
             

          const isCourseExist = await Course.findById(courseId);

          if(!isCourseExist){
              return res.status(404).json({
                  success:false,
                  message:"Course Not Found."
              })
          };
            
      //     if(req.files || req.files.thumbnailImage){
      //           const thumbnail =  req.files.thumbnailImage;

      //         const result =  await uploadToCloudinary(thumbnail,process.env.THUMBNAIL_FOLDER);

      //           isCourseExist.thumbnail = result?.secure_url ;
      //     }




        //   updated the field which present in updates -->

          for(const key of Object.keys(updates)){
                 
                 
                  
                       
                        if(key === 'tag' || key === 'instructions'){
                              isCourseExist[key] = JSON.parse(updates[key])
                        }else{
                             isCourseExist[key] = updates[key];
                        }
                  
          }
         await isCourseExist.save();

         const updatedCourse = await Course.findById(isCourseExist?._id).populate({
              model:"Section",
              path:"sections",
               populate:{
                    model:"SubSection",
                    path:"subSectionsId"
               }
             

         });

         

         return res.status(200).json({
                success:true,
                message:"Course Updated.",
                data:updatedCourse
         })
       }catch(err){
             console.error(err);

             return res.status(500).json({
                  success:false,
                  message:"Internal Server Error."
             })
       }
}