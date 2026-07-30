

import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import IconBtn from '../../../../Common/IconBtn';
import { IoAddCircleOutline } from "react-icons/io5"
import { MdNavigateNext } from "react-icons/md"
import {setStep,setEditCourse} from "../../../../../slices/courseSlice"

export default function CourseBuilderForm() {

    const{register,handleSubmit,reset,getValues,setValue,formState:{errors}} = useForm();

    const [editSectionName,setEditSectionName]=useState(null); 

    const [loading,setLoading] = useState(false);

    


  const onSubmit = (event)=>{
         event.preventDefault();
  }

  function goBack(){
   
  };

  function goToNext(){

  }

  // cancel edit section --->
  function cancelEdit(){
           setEditSectionName(null);
           setValue("sectionName","");
  }


  return (
    <div className="space-y-8 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-6">
           <p className="text-2xl font-semibold text-richblack-5">Course Builder</p> 
           <form onSubmit={handleSubmit(onSubmit)}>
               <div  className="flex flex-col space-y-2">
                  <label htmlFor='section-name'  className="text-sm text-richblack-5">
                        Section Name <sup className='text-pink-200'>*</sup>
                  </label>
                  <input id='section-name'  disabled={loading} type="text" placeholder='Add a section to build your course' className='form-style w-full'
                   {...register("sectionName",{required:true})}
                  />
                  {
                    errors.sectionName &&(
                      <span className="ml-2 text-xs tracking-wide text-pink-200">
                           Section-Name is required.
                      </span>
                    ) 
                  }
               </div>
               <div className="flex items-end gap-x-4 mt-2">
                  <IconBtn type="submit" disabled={loading} text={editSectionName ? "Edit Section Name" : "Create Section"} outline={true}>
                    <IoAddCircleOutline size={20} className='text-yellow-50'/>
                  </IconBtn>
                  {
                    editSectionName && (
                        <button type='button' className='text-sm text-richblack-300 underline' onClick={cancelEdit}>
                              Cancel Edit
                        </button>
                    )
                  }
               </div>
           </form>
           <div  className="flex justify-end gap-x-3">
               <button  onClick={goBack} className={`flex cursor-pointer items-center gap-x-2 rounded-md bg-richblack-300 py-[8px] px-[20px] font-semibold text-richblack-900`}>
                   Back
               </button>

               <IconBtn text="Next" disabled={loading} onClick={goToNext}>
                     <MdNavigateNext/>
               </IconBtn>

           </div>
    </div>
  )
}
