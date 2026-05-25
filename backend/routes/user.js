const express = require("express");

const router = express.Router();


const {signup} = require("../controller/User/signUp");
const {logIn} = require("../controller/User/login");
const {auth,isAdmin,isInstructor,isStudent}= require("../middleware/auth");
const {resetPasswordToken,resetpassword} = require("../controller/User/resetPassword");
const {changePassword}=require("../controller/User/changePassword");
const {sendOtp}=require("../controller/OTP/sendOtp");

const {contactUs} = require("../controller/User/contactUs")

router.post("/sign",signup);

router.post("/login",logIn);

router.post("/sendotp",sendOtp);

router.post("/change-password",auth,changePassword);

router.post("/reset-password-token",resetPasswordToken);

router.post("/reset-password",resetpassword);

router.post("/contact",contactUs);

module.exports = router ;
