import React, { useEffect, useState } from 'react'
import { getEnrolledCourses } from '../../../services/operations/profileApi';
import { useSelector } from 'react-redux';
import  ProgressBar from "@ramonak/react-progress-bar"

export default function EnrolledCourses() {
     
    const {token} = useSelector(state=>state.auth);

    const [enrolledCourse,setEnrolledCourse] = useState([]);
    

    useEffect(()=>{
         (
            async()=>{
                try{
                const res = await getEnrolledCourses();
                console.log(res);   
            }catch(error){
              console.log("Could not fetch enrolled courses.")
            }
        }  
         )();
    },[])

  return (
    <div>
          <div className='text-3xl text-richblack-500'>Enrolled Courses</div>
           {
            !enrolledCourse ? (
              <div className='grid min-h-[calc(100vh-3.5rem)] place-items-center'>
                <div className='spinner'></div>
              </div>
            ) : (!enrolledCourse.length ? (<p className="grid h-[10vh] w-full place-content-center text-richblack-5">Your have not enrolled in any course yet..</p>):(

               <div className='my-8 text-richblack-5'>
                   {/* heading */}
                   <div className=' flex rounded-t-lg bg-richblack-500'>
                    <p className='w-[45%] px-5 py-3'>Course Name</p>
                    <p className='w-1/4 px-2 py-3'>Duration</p>
                    <p className='flex-1 px-2 py-3'>Progress</p>
                   </div>

                    {/* course Name */}

                    {
                        enrolledCourse.map((course,idx,arr)=>(
                          
                             <div key={idx} className={`flex items-center border border-richblack-700 ${
                idx === arr.length - 1 ? "rounded-b-lg" : "rounded-none"
              }`}>
               
                
                              <div className='flex w-[45%] cursor-pointer items-center gap-4 px-5 py-3' >
                                <img src={course?.thumbnail} alt="course_img" 
                                className="h-14 w-14 rounded-lg object-cover"/>
                                <div className="flex max-w-xs flex-col gap-2">
                                  <p className='font-semibold'>{course?.courseName}</p>
                                  <p className='text-xs text-richblack-300'>{course?.description.length >50 ?` ${course?.description.slice(0,50)}...` : course?.description}</p>
                                </div>
                              </div>
                              <div className='w-1/4 px-2 py-3'>{course?.totalDuration}</div>
                              <div className='flex w-1/5 flex-col gap-2 px-2 py-3'>
                                <p>Progress:{course?.progressPercentage || 0}%</p>
                                <ProgressBar
                                  completed={course?.progressPercentage || 0}
                                  isLabelVisible={false}
                                  height='8px'
                                />
                              </div>
                                 
                             </div>
                        )
                          )
                    }
               </div>
               
            )) 
           }
    </div>
  )
}
