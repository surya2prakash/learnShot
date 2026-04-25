const mongoose = require("mongoose");

const ratingAndReviewsSchema = new mongoose.Schema(
    {
        // user Id ----> user who give the rating and review --
        userId:{
              type:mongoose.Schema.Types.ObjectId,
              ref:"User",
              required:true
        },
        // rating --->
        rating:{
             type:Number,
             required:true,
             trim:true
        },
        // review --->
        review:{
             type:String,
             required:true,
             trim:true
        },
        // course --->
        courseId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Course",
            required:true,
            index:true
        }
    },{timestamps:true}
);

module.exports = mongoose.model("RatingAndReviews",ratingAndReviewsSchema);