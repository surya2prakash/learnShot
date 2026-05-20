const Course = require("../../model/course");
const User = require("../../model/user");
const RatingAndReviews = require("../../model/ratingAndReviews");

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
}