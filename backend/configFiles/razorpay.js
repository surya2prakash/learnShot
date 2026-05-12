const razorpay = require("razorpay");

require("dotenv").config();

exports.instance = new razorpay({
      key_id:process.env.RAZOR_KEY,
      key_secret:process.env.RAZOR_SECRET
}) ;


