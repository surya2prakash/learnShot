const express = require("express");

const router = express.Router();

// middleware ------------>
const {auth,isInstructor, isStudent} = require("../middleware/auth");

// course ---------------->
const {createcourse} = require("../controller/course/createCourse");
const {singleCourse,allCourse} = require("../controller/course/getCourse");
const {editCourse} = require("../controller/course/updateCourse");

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

const {ratingAndReviews} = require("../controller/ratingAndReviews/createRating");


// category --------------->
const {createcategory} =require("../controller/Category/createCategory");
const {getAllCategory}= require("../controller/Category/getCategory");

// *********************************************************************
// *                       Course                                      *
// *********************************************************************
router.post("/createcourse",auth,isInstructor,createcourse);
router.get("/getCourses",auth,allCourse);
router.get("/getCourse",auth,singleCourse);
router.patch("/editcourse",auth,isInstructor,editCourse);

// *********************************************************************
// *                       Section                                     *
// *********************************************************************

router.post("/addsection",auth,isInstructor,createsection);
router.patch("/updatesection",auth,isInstructor,updatesection);
router.post("/deletesection",auth,isInstructor,deletesection);

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
   router.get("/category",auth,getAllCategory);

// ****************************************************************
// *                     Rating and Review                        *
// ****************************************************************
router.post("/ratingandreview",auth,ratingAndReviews);




module.exports = router;