const express = require("express");

const router = express.Router();


const {captureThePayment,verifyPayment,sendSuccessEmail} =  require("../controller/Payment/payment");

const {auth,isStudent} = require("../middleware/auth");


router.post("/capture-payment",auth,isStudent,captureThePayment);

router.post("/verify-payment",auth,isStudent,verifyPayment);

router.post("/sendSuccessEmail",auth,isStudent,sendSuccessEmail);



module.exports = router ;