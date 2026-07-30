import { useForm } from "react-hook-form"
import { HiOutlineCurrencyRupee } from "react-icons/hi"
import ChipInput from "./ChipInput";
import Upload from "../Upload";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import RequirementsField from "./RequirementsField";
import IconBtn from './../../../../Common/IconBtn'
import { addCourseDetails, editCourseDetails, fetchCourseCategory } from "../../../../../services/operations/courseDetailsApi";
import toast from "react-hot-toast";
import{COURSE_STATUS} from "../../../../../utils/Constants"
import { setCourse, setStep } from "../../../../../slices/courseSlice";


export default function CourseInformationForm (){

      const {handleSubmit,register,formState:{errors},getValues,setValue}= useForm();
     
      const {course,editCourse}= useSelector(state=>state.course);

      const[loading,setLoading] = useState(false);

      const [courseCategory,setCourseCategory]=useState([]);

      const dispatch = useDispatch();


      const isFormUpdated =()=>{
            const currentValues = getValues();
            // checking the update information about the course if any of these value se updated return true either return false -->
             if(currentValues.courseTitle !== course?.courseName || currentValues?.desctiption !== course?.description
                 || currentValues?.courseTags.toString() !== course?.tags.toString() || currentValues?.courseImage !== course?.thumbnailImage 
                 || currentValues?.courseBenefits !== course?.whatYouWillLearn || currentValues?.courseCategoryId !== course?.categoryId 
                  || currentValues?.courseRequirements !== course?.instructions || currentValues?.coursePrice !== course?.price
             ){
                 return true ;
             };
             return false ;
      }

        const submitHandler = async(data)=>{

            console.log(data);
            if(editCourse){
                // if edit Course true then -->

                if(isFormUpdated()){
                      
                    const currentValues = getValues();
                    const formData = new FormData();

                    formData.append("courseId",course?._id);
                    
                    if(currentValues.courseTitle !== course?.courseName){
                        //  that means course name is changed -->
                        formData.append("courseName",data?.courseTitle);
                    };

                    if(currentValues?.description !== course?.description){
                        //   that means course description is changed -->
                        formData.append("description",data?.description);
                    }

                    if(currentValues?.courseTags !== JSON.stringify(course?.tags)){
                        //   that means tags is changed-->
                        formData.append("tags",data?.courseTags);
                    }

                    if(currentValues?.courseCategoryId !== course?.categoryId){
                        //   category is changed -->
                        formData.append("categoryId",data?.courseCategoryId);
                    };

                    if(currentValues?.courseImage !== course?.thumbnail){
                           formData.append("thumbnailImage",data?.courseImage);
                    }

                    if(currentValues?.courseBenefits !== course?.whatYouWillLearn){
                          formData.append("whatYouWillLearn",data?.courseBenefits);
                    };

                    if(currentValues?.coursePrice !== course?.price){
                          formData.append("price",data?.coursePrice);
                    };

                    if(currentValues?.courseRequirements.toString() !== course?.instructions.toString()){
                           formData.append("instructions",JSON.stringify(data?.courseRequirements));
                    };
                    

                    setLoading(true);
                    const result = await editCourseDetails(formData);
                    setLoading(false);
                    if(result){
                        toast.success(result?.message);
                         dispatch(setStep(2));
                         dispatch(setCourse(result));
                    }
                }else{
                     toast.error("No Changes made to the form.")
                }

                return ;
            }


            const formData = new FormData();
                 
            formData.append("courseName",data?.courseTitle);
                   
            formData.append("price",data?.coursePrice);
            formData.append("whatYouWillLearn",data?.courseBenefits);
            formData.append("description",data?.description);
            formData.append("tags",JSON.stringify(data?.courseTags));
            formData.append("instruction",JSON.stringify(data?.courseRequirements));
            formData.append("thumbnailImage",data?.courseImage);
            formData.append("categoryId",data?.courseCategoryId);
            formData.append("status",COURSE_STATUS?.DRAFT)

            setLoading(true);
            console.log(data?.courseTitle);
            for(const[key,value] of formData.entries()){
                  console.log(key,value);
            };
            const result = await addCourseDetails(formData);
          
               console.log(result);
            if(result){
                dispatch(setStep(2));
                dispatch(setCourse(result));
            }
                setLoading(false);
          };

          useEffect(()=>{
                const getCategories = async()=>{
                      setLoading(true);

                      const categories = await fetchCourseCategory();
                        
                      if(categories.length > 0){
                           
                          setCourseCategory(categories);
                          
                      }
                      setLoading(false);
                }
                getCategories();
          },[setCourseCategory]);

         
      return(
         <div>
              <form className="space-y-8 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-6" onSubmit={handleSubmit(submitHandler)}>
                   {/* course title */}
                   <div className="flex flex-col space-y-2">
                     <label htmlFor="course-title" className="text-sm text-richblack-5">
                        Course Title <sup className="text-pink-200">*</sup>
                     </label>
                     <input placeholder="Enter Title" id="course-title" {...register("courseTitle",{required:true})} className="form-style w-full"/>
                     {
                        errors.courseTitle && (<span>
                            Course title is required.
                        </span>)
                     }
                   </div>
                   {/* short desription */}
                   <div className="flex flex-col space-y-2">
                       <label htmlFor="course-description" className="text-sm text-richblack-5">
                            Course short description <sup className="text-pink-200">*</sup>
                            
                       </label>
                       <textarea placeholder="Enter Description" id="course-description"
                            {...register("description",{required:true})} className="form-style resize-x-none min-h-[130px] w-full" />
                        {
                            errors.desription && (
                                <span>Course short description is required.<sup className="text-pink-200">*</sup></span>
                            )
                        }    
                   </div>
                     <div className="flex flex-col space-y-2">
                        <label htmlFor="course-price" className="text-sm text-richblack-5">
                             Course Price <sup className="text-pink-200">*</sup>
                        </label>
                        <div className="relative">
                        <input placeholder="Enter Price" {...register("coursePrice",{required:true,valueAsNumber:true,pattern:{
                            value: /^(0|[1-9]\d*)(\.\d+)?$/
                        }})}
                          className="form-style w-full !pl-12"
                        />
                        <HiOutlineCurrencyRupee className="absolute left-3 top-1/2 inline-block -translate-y-1/2 text-2xl text-richblack-400"/>
                        {
                            errors.coursePrice && (<span>Course price is required.</span>)
                        }
                        </div>
                     </div>
                     <div className="flex flex-col space-y-2" >
                   
                        <label htmlFor="course-category" className="text-sm text-richblack-5">
                            Course category <sup className="text-pink-200">*</sup>
                        </label>
                        <select defaultValue="" id="course-category" className="form-style w-full" 
                          {...register("courseCategoryId",{required:true})}
                         >
                           
                             <option value="" disabled>
                                 Choose a category
                             </option>
                             {
                                !loading && courseCategory?.map((category,idx)=>(
                                    
                                    <option key={idx} value={category?._id}>
                                          {category?.categoryName} 
                                    </option>
                                ))
                             }
                        </select>
                        {
                            errors.courseCategory && (
                                <span>Course Category is required.</span>
                            )
                        }
                     </div>
                     {/* course tags */}
                      <ChipInput 
                          label="Tags"
                          name="courseTags"
                          placeholder="Enter Tags and Press Enter"
                          register={register}
                          setValue={setValue}
                          getvalues={getValues}
                          errors={errors}

                         />

                         {/*course thumbnail uploader  */}
                         <Upload
                            name="courseImage"
                            label="Course-thumbnail"
                            register={register}
                            setValue={setValue}
                            errors={errors}
                            editData={editCourse ? course?.thumbnail :null}
                         />
                    
                    {/* benifit of course */}
                    <div className="flex flex-col space-y-2">
                        <label className="text-sm text-richblack-5" htmlFor="courseBenefits">
                              Benefits of the course <sup className="text-pink-200">*</sup>
                        </label>
                        <textarea id="courseBenefits" placeholder="Enter benefits of the course" 
                         className="form-style resize-x-none min-h-[130px] w-full"
                         {...register("courseBenefits" ,{required:true})} />
                         {
                            errors.courseBenefits && (<span className="ml-2 text-xs tracking-wide text-pink-200">
                                Benefits of the course is required
                            </span>)
                         }
                    </div>

                    {/* Requirements/instructions */}
                    <RequirementsField
                    name="courseRequirements"
                    label="Requirements/Instructions"
                    register={register}
                    setValue={setValue}
                    errors={errors}
                    getvalue={getValues}
                    />

                    {/* for next step --> */}
                    <div>
                        {
                            editCourse && (
                                <button>
                                    Continue Without Saving
                                </button>
                            ) 
                        }
                        
                    </div>
                    <IconBtn text={editCourse ? "Next" : "Save Changes"} />

              </form>

         </div>
      )
}