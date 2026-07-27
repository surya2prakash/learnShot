const express = require("express");

const router = express.Router();


const {auth,isAdmin,isInstructor,isStudent} = require("../middleware/auth");

const {updateProfile} = require("../controller/profile/updateProfile");
const {deleteaccount} =require("../controller/profile/deleteAccount");
const {updateProfilePicture}= require("../controller/profile/updateProfilePic");
const {getuserdetails} = require("../controller/profile/getUserDetails");
const {getEnrolledCourse} = require("../controller/profile/getEnrolledCourses");
const {instructorDashBoard} = require("../controller/profile/instructorDashboard");



router.put("/updateProfile",auth,updateProfile);

router.put("/updateProfilePic",auth,updateProfilePicture);

router.delete("/deleteProfile",auth,deleteaccount);

router.get("/getEnrolledCourses",auth,getEnrolledCourse);

router.get("/getUserDetails",auth,getuserdetails);

router.get("/instructorDashboard",auth,isInstructor,instructorDashBoard);


module.exports = router;