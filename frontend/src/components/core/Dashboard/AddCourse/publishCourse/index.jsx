import { useForm } from "react-hook-form"
import IconBtn from "../../../../Common/IconBtn";
import { useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { resetCourseState, setStep } from "../../../../../slices/courseSlice";
import { COURSE_STATUS } from "../../../../../utils/Constants";
import { editCourseDetails } from "../../../../../services/operations/courseDetailsApi";
import {useNavigate}from"react-router-dom"



export default function PublishCourse(){

       const {register,setValue,getValues,handleSubmit,formState:{errors}} = useForm();

       const [loading,setLoading] = useState(false);

       const dispatch = useDispatch();

       const {course} = useSelector(state => state.course);

       const navigate = useNavigate();

       function goBack(){
               dispatch(setStep(2)); 
       }

       useEffect(()=>{
             if(course?.status === COURSE_STATUS?.PUBLISHED ){
                 setValue("public",true)
                 
             }
       },[])

       const goToCourses = () =>{
              dispatch(resetCourseState());
               navigate("/dashboard/my-courses");
       }

       async  function handleCoursePublic(){
               if(course?.status === COURSE_STATUS?.PUBLISHED && getValues("public") === true || course?.status === COURSE_STATUS?.DRAFT && getValues("public") === false ){
                 goToCourses();
                 return ;
             }   

             const formData = new FormData();

               formData.append("courseId",course?._id);

              const courseStatus = getValues("public") ? COURSE_STATUS?.PUBLISHED :COURSE_STATUS?.DRAFT 

                formData.append("status",courseStatus);
                setLoading(true);

                const result = await editCourseDetails(formData);

                if(result){
                    console.log(result);
                     goToCourses()
                }

                setLoading(false);
         }

       const onSubmit = async(data)=>{
                 handleCoursePublic();
       }

       return (
        <div className="rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-6">
              <p className="text-2xl font-semibold text-richblack-5">Publish Settings</p>

              <form onSubmit={handleSubmit(onSubmit)}>
                   <div className="my-6 mb-8">

                     {/* checkbox */}
                       <label htmlFor="public" className="inline-flex items-center text-lg">
                       <input type="checkbox" id="public" {...register("public")} 
                        className="border-gray-300 h-4 w-4 rounded bg-richblack-500 text-richblack-400 focus:ring-2 focus:ring-richblack-5" />
                        {
                          errors.public && (<span className="ml-2 text-richblack-400">
                                Make this course as public
                          </span>)  
                        }
                        </label>
                     </div>
                        {/* next prev button */}
                        <div className="ml-auto flex max-w-max items-center gap-x-4">
                            <button disabled={loading} type="button" onClick={goBack}
                            className="flex cursor-pointer items-center gap-x-2 rounded-md bg-richblack-300 py-[8px] px-[20px] font-semibold text-richblack-900"
                            >
                                     Back
                            </button>

                            <IconBtn disabled={loading} text="Save Changes"/>
                        </div>
                   
              </form>
        </div>
       )
}