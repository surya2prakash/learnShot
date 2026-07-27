const express = require("express");

const router = express.Router();


const {signup} = require("../controller/User/signUp");
const {logIn} = require("../controller/User/login");
const {auth,isAdmin,isInstructor,isStudent}= require("../middleware/auth");
const {resetPasswordToken,resetpassword} = require("../controller/User/resetPassword");
const {changePassword}=require("../controller/User/changePassword");
const {sendOtp}=require("../controller/OTP/sendOtp");

const {contactUs} = require("../controller/User/contactUs")

router.post("/signup",signup);

router.post("/login",logIn);

router.post("/sendotp",sendOtp);

router.post("/change-password",auth,changePassword);

router.post("/reset-password-token",resetPasswordToken);

router.post("/reset-password",resetpassword);

router.post("/contact-Us",contactUs);

router.post("/logout",auth,async(req,res)=>{
       try{
          
        res.clearCookie("token",{
             httpOnly:true,
             secure:false
        });

        return res.status(200).json({
              success:true,
              message:"Logout successfully."
        })

       }catch(err){
          res.status(500).json({
             success:false,
             message:"Unable to remove cookie."
          })
       }
})

module.exports = router ;
