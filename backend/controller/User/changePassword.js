const User = require("../../model/user");
const bcrypt = require("bcrypt");
const mailSender = require("../../utility/mailSender/mailsender");
const passwordUpdated = require("../../utility/mailTemplate/passwordUpdateTemp");

exports.changePassword = async(req,res) =>{
       try{

        //    destructure old-password and new-password from req.body -->
            const {oldPassword,newPassword} = req.body ;
          
            // userId from payload -->
            const userId = req.user.id ;

            // if any field are missing then --->
            if(!oldPassword || !newPassword){
                return res.status(400).json({
                     success:false,
                     message:"All fields required."
                });
            };

            // check user 

            const isExist = await User.findById(userId).select("+password");

            if(!isExist){
                 return res.status(404).json({
                     success:false,
                     message:"User not found."
                 });
            };
         
            const isMatch = await bcrypt.compare(oldPassword,isExist.password);

            if(!isMatch){
                 return res.status(401).json({
                     success:false,
                     message:"Incorrect old password."
                 });
            };

            // old password match then -->

            // hash the new password and update into the user doc.

            const newHashedPassword = await bcrypt.hash(newPassword,10);
         
            // update the password in user doc -->
             const updatePassword = await User.findByIdAndUpdate(userId,{password:newHashedPassword});
            
            if(!updatePassword){
                 return res.status(500).json({
                     success:false,
                     message:"Facing issue while update Password. Try again"
                 })
            };

            try{
                //    send email to the user for password updated successfully --->
                const emailResponse =await mailSender(
                     updatePassword.email,
                     "Password for your account has been updated",
                     passwordUpdated(
                        updatePassword.email,
                        `Password Updated for ${updatePassword.firstName} ${updatePassword.lastName}`
                     )

                )

            }catch(err){
                 console.error(err);
                 return res.status(500).json({
                     success:false,
                     message:"Error Occour while sending the Email."
                 })
            }
           

           
            return res.status(200).json({
                 success:true,
                 message:"Password Updated."

            })
       }catch(err){
         console.error(500).json({
             success:false,
             message:"Change Password failure.Try again."
         })
       }
}