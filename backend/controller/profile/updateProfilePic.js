const User = require("../../model/user");
const Profile = require("../../model/profile");
const {uploadToCloudinary} = require("../../utility/uploadToCloudinary");

require("dotenv").config();

exports.updateProfilePicture = async(req,res) =>{
       try{
            const id = req.user.id ;

            const isUser = await User.findById(id);

            if(!isUser){
                 return res.status(404).json({
                     success:false,
                     message:"User Not Found."
                 })
            };
              const image = req.files.imageProfile ;

              if(!req.files || !image){
                  return res.status(400).json({
                      success:false,
                      message:"Profile image required."
                  })
              }

              const result = await uploadToCloudinary(image,process.env.PROFILE_FOLDER,1000,1000);

              const updateProfilePic = await User.findByIdAndUpdate(id,{image:result?.secure_url},{new:true});
         
              res.send({
                 success:true,
                 message:"Profile Image Updated Successfully.",
                 data:updateProfilePic
              })

       }catch(err){
            console.error(err);
            return res.status(500).json({
                  success:false,
                  message:"Error while Updating the profile Pic."
            })
       }
}