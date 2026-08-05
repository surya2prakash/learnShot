import react, { useEffect, useState } from 'react'
import { RxCross2 } from "react-icons/rx"
import Upload from "../Upload"
import  {useForm}    from 'react-hook-form'
import IconBtn from '../../../../Common/IconBtn';
import { createSubSection } from '../../../../../services/operations/courseDetailsApi';
import { useDispatch, useSelector } from 'react-redux';
import { setCourse } from '../../../../../slices/courseSlice';


export default function SubSectionModal({modalData,setModalData,add=false,edit=false,view=false}) {
        
                
      const {register,handleSubmit,setValue,getValues,formState:{errors}} = useForm();
      const [loading,setLoading] =useState(false);

      const {course} = useSelector(state => state.course);

      const dispatch = useDispatch();


      useEffect(()=>{
           if(view || edit){
                setValue("lectureTitle",modalData?.title);
                setValue("lectureDescription",modalData?.description);
                setValue("lectureVideo",modalData?.videoFile);
           }
             
      },[])

      const onSubmit= async(data)=>{
              console.log(data);
            const formData = new FormData();

             formData.append("sectionId",modalData);
             formData.append("title",data?.lectureTitle);
             formData.append("description",data?.lectureDescription);
             formData.append("videoFile",data?.lectureVideo);

             setLoading(true);

             const result = await createSubSection(formData);

             console.log(result);

             if(result){
               
                const updateCourseContent = course?.sections.map((section,idx)=>(
                       section?._id === modalData ? result : section 
                ))
               
                const updatedCourse ={...course,sections:updateCourseContent};

                dispatch(setCourse(updatedCourse));
             }

             setLoading(false);

      }
    

      return(
        <div className='fixed inset-0 z-[1000] !mt-0 grid h-screen w-screen place-items-center overflow-auto bg-white bg-opacity-10 backdrop-blur-sm'>
            <div className='my-10 w-11/12 max-w-[700px] rounded-lg border border-richblack-400 bg-richblack-800'>

                 <div className='flex items-center justify-between rounded-t-lg bg-richblack-700 p-5'>
                    <p className='text-xl font-semibold text-richblack-5'>{view && "Viewing"} {add && "Adding"} {edit && "Editing"} Lecture</p>
                    <button onClick={()=>{!loading ? setModalData(null) : {}}}>
                        <RxCross2 className='text-2xl text-richblack-5'/>
                    </button>
                 </div>

                 <form onSubmit={handleSubmit(onSubmit)} 
                   className='space-y-8 px-8 py-10'
                 >
                     {/* upload video lecture */}
                     <Upload 
                       name="lectureVideo"
                       register={register}
                       label="Lecture Video"
                       setValue={setValue}
                       errors={errors}
                       video={true}
                       viewData={view ? modalData?.videoUrl : null}
                       editData={edit ? setModalData?.videoUrl : null}
                     />
                       
                       {/* Lecture title */}
                     <div className='flex flex-col space-y-2'>
                        <label htmlFor='lecture-title' className='text-sm text-richblack-5'>
                                Lecture Title
                        </label>
                        <input type='text' id='lecture-title' placeholder='Enter Lecture Title' {...register("lectureTitle",{required:true})}
                          className='form-style w-full' />
                        {
                            errors.lectureTitle && (<span className='ml-2 text-xs tracking-wide text-pink-200'>
                                Lecture title is required
                            </span>)
                        }
                     </div>

                     {/* Lecture description ---> */}
                      
                      <div className='flex flex-col space-y-2' >
                          <label htmlFor='lecture-dec' className='text-richblack-5 text-sm'>
                                Lecture Description {" "} {!view && <sup className='text-pink-200'>*</sup> }
                          </label>
                          <textarea type='text' disabled={view || loading} placeholder='Enter Lecture Description' id='lecture-dec' {...register("lectureDescription",{required:true})}
                             className='form-style resize-x-none min-h-[130px] w-full'
                          />
                          {
                            errors.lectureDescription && (<span className='ml-2 text-xs tracking-wide text-pink-200'>
                                 Lecture Description is required
                            </span>)
                          }
                      </div>
                     {
                        !view && (<div className='flex justify-end'>
                               <IconBtn disabled={loading} text={loading ? "Loading..." : edit ? "Save Changes" :"Save"} />
                        </div>)
                     }
                 </form>
            </div>
            
        </div>
      )
}