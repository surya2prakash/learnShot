const User = require("../../model/user");
const Profile = require("../../model/profile");
const uploadToCloudinary = require("../../utility/uploadToCloudinary");

require("dotenv").config();

exports.updateProfile =async(req,res) =>{
       try{

        const {firstName,lastName,gender,contactNumber,dateOfBirth,about} = req.body ;


        const userId = req.user.id ;

        //   check user by userId in doc -->

        const isUserExist = await User.findById(userId);

        if(!isUserExist){
              return res.status(404).json({
                 success:false,
                 message:"User Not Found."
              });
        };

      
          if(firstName ){
                isUserExist.firstName =firstName ;
          }

          if(lastName){
              isUserExist.lastName = lastName ;
          }
        
           const isProfile = await Profile.findById(isUserExist?.profileId);


           if(gender){
                 isProfile.gender =gender ;
           }

           if(about){
               isProfile.about = about ;
           }
           
           if(dateOfBirth){
               isProfile.dateOfBirth = dateOfBirth ;
           };
           
           if(contactNumber){
              isProfile.contactNumber = contactNumber
           }

           await isUserExist.save();
           await isProfile.save();
           
              const updatedProfile = await User.findById(userId).populate({
                  path:"profileId",
                  model:"Profile"
              }).exec();

             return res.status(200).json({
                   success:true,
                   message:"Profile Updated.",
                   data:updatedProfile
             })



       }catch(err){
           return res.status(500).json({
             success:false,
             message:"Internal Server Error."
           })
       }
}


exports.updateImage = async (req,res) =>{
       try{
         
          const imageProfile = req.files.profileImage ;

          const userId = req.user.id ;

          if(!imageProfile || !req.files){
              return res.status(400).json({
                  success:false,
                  message:"Display Picture Required."
              });
          };

        // user id -->
        
        const isUserExist = await User.findById(userId) ;

        if(isUserExist){
               return res.status(404).json({
                  success:false,
                  message:"User Not Found."
               })
        };

        // upload image to cloudinary
           
        const uploadImage = await uploadToCloudinary(file,process.env.PROFILE_FOLDER,1000,1000) ;

        const updateProfileImage = await User.findByIdAndUpdate(userId,{image:uploadImage?.secure_url},{new:true}).exec();

        return res.status(200).json({
               success:true,
               message:"Profile Image Updated .",
               data:updateProfileImage
        })


       }catch(err){
           console.error(err);
           return res.status(500).json({
             success:false,
             message:"Internal Server Error."
           });
       };
}