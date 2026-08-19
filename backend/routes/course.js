const express = require("express");

const router = express.Router();

// middleware ------------>
const {auth,isInstructor, isStudent} = require("../middleware/auth");

// course ---------------->
const {createcourse} = require("../controller/course/createCourse");
const {singleCourse,allCourse,getInstructorCourses,getFullCourseDetails} = require("../controller/course/getCourse");
const {editCourse} = require("../controller/course/updateCourse");
const {deletecourse} = require("../controller/course/deleteCourse")

// section -------------->
const {createsection} = require("../controller/Section/createSection");
const {updatesection}= require("../controller/Section/updateSection");
const {deletesection}= require("../controller/Section/deleteSection");

// sub sections --->
const {createsubSection} = require("../controller/SubSection/createSubSection");
const {updatesubsection} = require("../controller/SubSection/updateSubSection");
const {deletesubsection} = require("../controller/SubSection/deleteSubSection");

// course - progress ---------------->

const {updateCourseProgress} = require("../controller/courseProgress/courseProgress");

// review - and rating ---------------->

const {ratingAndReviews,getAllReviewRating,getAverageRating} = require("../controller/ratingAndReviews/createRating");


// category --------------->
const {createcategory} =require("../controller/Category/createCategory");
const {getAllCategory}= require("../controller/Category/getCategory");

// *********************************************************************
// *                       Course                                      *
// *********************************************************************
router.post("/createcourse",auth,isInstructor,createcourse);
router.get("/getCourses",auth,allCourse);
router.get("/getCourse",auth,singleCourse);
router.post("/editcourse",auth,isInstructor,editCourse);
router.delete("/deletecourse",auth,isInstructor,deletecourse);
router.get("/allinstructorcourses",auth,isInstructor,getInstructorCourses);
router.post("/getFullCourseDetails",auth,getFullCourseDetails);

// *********************************************************************
// *                       Section                                     *
// *********************************************************************

router.post("/addsection",auth,isInstructor,createsection);
router.patch("/updatesection",auth,isInstructor,updatesection);
router.delete("/deletesection",auth,isInstructor,deletesection);

// *********************************************************************
// *                      Sub-Section                                  *
// *********************************************************************
router.post("/addsubsection",auth,isInstructor,createsubSection);
router.patch("/updatesubsection",auth,isInstructor,updatesubsection);
router.post("/deletesubsection",auth,isInstructor,deletesubsection);

// ********************************************************************
// *                      course-progress                             *
// ********************************************************************

router.post("/updatecourseprogress",auth,isStudent,updateCourseProgress);

// **************************************************************
// *                  Category                                  *
// **************************************************************
   router.post("/createcategory",auth,isInstructor,createcategory);
   router.get("/category",getAllCategory);

// ****************************************************************
// *                     Rating and Review                        *
// ****************************************************************
router.post("/ratingandreview",auth,isStudent,ratingAndReviews);
router.get("/getAverageRating",getAverageRating);
router.get("/getReviews",getAllReviewRating);




module.exports = router;