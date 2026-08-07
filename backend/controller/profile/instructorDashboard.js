const Course = require("../../model/course")


exports.instructorDashBoard = async(req,res) =>{
       try{
            //  user should be instructor -->

            const courseDetails = await Course.find({instuctorId:req.user.id});

            const courseData = courseDetails.map((course)=>{
                    const totalStudentEnrolled = course?.studentEnrolled.length
                    const totalAmountGenrated = totalStudentEnrolled * course?.price

                    const courseDataWithStats = {
                        _id:course?._id,
                        courseName:course?.courseName,
                        courseDescription:course?.description,

                        // include totalStudentEnrolled and totalAmountGenrated 
                        totalAmountGenrated,
                        totalStudentEnrolled
                    }

                    return courseDataWithStats;
            });


            return res.status(200).json({
                  success:true,
                  message:"Instuctor DashBoard.",
                  data:courseData
            })


       }catch(error){
        console.error(error);
          return res.status(500).json({
               success:false,
               message:"Internal Server Error"
          })
            
       }
}