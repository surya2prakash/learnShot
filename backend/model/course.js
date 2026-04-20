
const mongoose = require("mongoose");


const courseSchema = new mongoose.Schema(
    {
        // course name --->
          courseName:{
             type:String,
             required:true,
             trim:true
          },
        //   course description --->
          description:{
              type:String,
              required:true,
              trim:true
          },
        //   shot summary of course --->
          whatYouWillLearn:{
              type:String,
              trim:true
          },
        //   instuctor Id --->
          instuctorId:{
              type:mongoose.Schema.Types.ObjectId,
              ref:"User"
          },

        //   course price --->
          price:{
             type:Number,
             required:true,
             trim:true
          },

        //   thumbnail  --->
          thumbnail:{
            type:String,
            trim:true
          },

        // tags --->
          tag:{
             type:[String],
             required:true,
             trim:true
          },
        //   course category --->
          categoryId:{
             type :mongoose.Schema.Types.ObjectId,
             ref:"Category"
          },
        //   students enrolled in course --->
          studentEnrolled:{
             type:mongoose.Schema.Types.ObjectId,
             ref:"User"
          },
          //instructions --->
          instructions:{
             type:[String]
          },
        //   course status ---> 
          status:{
              type:String,
              enum:["Draft","Published"]
          },
        //   course sections --->
          sections:[
            {
                type:mongoose.Schema.Types.ObjectId,
                ref:"Section"
            }
          ],

        //   rating and reviews --->
        ratingAndReviews:[
             {
                 type:mongoose.Schema.Types.ObjectId,
                 ref:"RatingAndReviews"
             }
        ],
             
        
    },{timestamps:true}
);

module.exports = mongoose.model("Course",courseSchema);