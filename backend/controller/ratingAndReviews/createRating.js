const Course = require("../../model/course");
const User = require("../../model/user");
const RatingAndReviews = require("../../model/ratingAndReviews");
const { default: mongoose } = require("mongoose");

exports.ratingAndReviews = async(req,res) =>{
       try{

        const {rating,review,courseId} = req.body ;

        const userId = req.user.id ;

        if(!rating || !review){
              return res.status(400).json({
                 success:false,
                 message:"All fields are required."
              });
        };
        
        const isCourseExist = await Course.findById(courseId);

        if(!isCourseExist){
              return res.status(404).json({
                 success:false,
                 message:"Course not found."
              });
        };

        if(typeof rating !== 'number'){
              return res.status(400).json({
                 success:false,
                 message:" Number required."
              });
        };

        // check the user by id in db --->

        const isUserExist = await User.findById(userId);

        if(!isUserExist){
              return res.status(400).json({
                 success:false,
                 message:"User Not Found. "
              });
        };

        // user found course found --->

        // now give the rating and review to the course

          const newRatingAndReview = new RatingAndReviews({
               userId:isUserExist?._id,
                courseId:isCourseExist?._id,
                rating:rating,
                review:review
          });

         await newRatingAndReview.save();

         return res.status(201).json({
             success:true,
             message:"Rating And Review Successfully Created.",
             data:newRatingAndReview
         });


       }catch(err){
          console.error(err);
          return res.status(500).json({
             success:false,
             message:"Internal Server Error ."
          })
       }
};

exports.getAverageRating = async(req,res) =>{
        try{

         const {courseId} = req.body ;

         if(!courseId){
              return res.status(400).json({
                success:false,
                message:"Course Id is missing."
              })
         };

           const currentAvg = await RatingAndReviews.aggregate([
            {
               $match:{
                  courseId: new mongoose.Types.ObjectId(courseId)
               }
            },{
                $group:{
                    _id:null,
                    averageRating:{$avg:rating}
                }
            }
           ]);

           if(currentAvg.length > 0){
               return res.status(200).json({
                   success:true,
                   data:{
                       avgRating:currentAvg[0].averageRating
                   }
               })
           }

           return res.status(200).json({
             success:true,
             data:{
                avgRating:0
             }
           });

        }catch(err){
            return res.status(500).json({
                 success:false,
                 message:"Internal Server Error."
            })
        }
}

exports.getAllReviewRating = async(req,res) =>{
      try{

           const allReviews = await RatingAndReviews.find({}).sort({rating:"desc"}).populate({
              path:"userId",
              select:"firstName lastName email image"
           }).populate({
               path:"courseId",
               select:"courseName"
           }).exec();

           return res.status(200).json({
               success:true,
               data:{
                   allReviews:allReviews
               }
           })

      }catch(err){
           return res.status(500).json({
            success:false,
            message:"Internal Server Error."
           })
      }
}