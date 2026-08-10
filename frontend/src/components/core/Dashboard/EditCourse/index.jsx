import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import RenderSteps from '../AddCourse/RenderSteps';
import { useParams } from 'react-router-dom';
import { detailsOfCourse } from '../../../../services/operations/courseDetailsApi';
import { setCourse, setEditCourse } from '../../../../slices/courseSlice';

export default function EditCourse(){
    
    const {course} = useSelector(state => state.course);

    const dispatch = useDispatch();

    const courseId = useParams();


    const getingCourseDetails = async() =>{
           
            const result = await detailsOfCourse({courseId:courseId?.courseId});

            if(result){
                    dispatch(setEditCourse(true));
                   dispatch(setCourse(result?.course));
                   
            }


    }

    useEffect(()=>{
          
          getingCourseDetails();
    },[])




      return (
          <>
            <h1 className='mb-14 text-3xl font-medium text-richblack-5'>
                Edit Course
            </h1>
            <div className='mx-auto max-w-[600px]'>
                   {
                    course ? (
                        <RenderSteps/>
                    ):(<p className='mt-14 text-center text-3xl font-semibold text-richblack-100'> Course Not Found</p>)
                   }
            </div>
          </>
      )
}
