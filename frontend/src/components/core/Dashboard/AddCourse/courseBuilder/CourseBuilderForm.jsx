

import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import IconBtn from '../../../../Common/IconBtn';
import { IoAddCircleOutline } from "react-icons/io5"
import { MdNavigateNext } from "react-icons/md"
import {setStep,setEditCourse} from "../../../../../slices/courseSlice"
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { createSection, updateSection } from '../../../../../services/operations/courseDetailsApi';
import NestedView from './NestedView';

export default function CourseBuilderForm() {

    const{register,handleSubmit,reset,getValues,setValue,formState:{errors}} = useForm();

    const [editSectionName,setEditSectionName]=useState(null); 

    const [loading,setLoading] = useState(false);

    const dispatch = useDispatch();

    const {course} = useSelector(state =>state.course);


  const onSubmit = async(data)=>{
         
           setLoading(true);

           let result ;
         if(editSectionName){
          // that means section was pre created
             result = await updateSection({sectionName:data?.sectionName,sectionId:editSectionName,courseId:course?._id});
         }else{

          result = await createSection({sectionName:data?.sectionName,courseId:course?._id})
             
         }

         if(result){
             setEditSectionName(null);
             dispatch(setCourse(result));
             setValue("sectionName","");

         }

         setLoading(false);
  }

  // back button
  function goBack(){
        dispatch(setStep(1));
        dispatch(setEditCourse(true));
  };

  // for next step of course -->
  function goToNext(){

       if(course.sections.length === 0){
          toast.error("Add atleast one section");
          return;
       };

       if(course.sections.some((section)=>section.subSectionsId.length===0)){
          toast.error("Add atleast one lecture in each section.");
          return;
       }
        
       dispatch(setStep(3));
  }

  // cancel edit section --->
  function cancelEdit(){
           setEditSectionName(null);
           setValue("sectionName","");
  }

  function handleChangeEditSectionName(sectionId,sectionName){
         if(editSectionName === sectionId){
             cancelEdit();
             return;
         };

         setEditSectionName(null);
         setValue("sectionName",sectionName);
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
           {
               course?.sections.length > 0 && (
                 <NestedView handleChangeEditSectionName ={handleChangeEditSectionName}/>
               )
           }
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
