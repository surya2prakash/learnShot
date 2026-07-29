   import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { MdClose } from "react-icons/md"
   
   export default function ChipInput({label,name,placeholder,register,setValue,getValues,errors}) {

      const {course,editCourse}= useSelector(state=>state.course);

      const [chips,setChips]=useState([]);

        
     function handleKeyDown(event){
          
        if(event.key === "Enter" || event.key === ","){
              event.preventDefault();

              const chipValue = event.target.value.trim();

              if(chipValue && !chips.includes(chipValue)){
                      
                   const newChips = [...chips,chipValue] ;
                    setChips(newChips);

                    event.target.value="";
              }
        }       
     } ;

     useEffect(()=>{
          console.log(chips);
          setValue(name,chips);
     },[chips]);

 
     return (
       <div className='flex flex-col space-y-2'>
              <label  htmlFor={name} className='text-sm text-richblack-5'>
                {label} <sup className='text-pink-200'>*</sup>
                </label>  
                <div className='flex flex-wrap w-full gap-y-2'>
                    {
                        chips.map((chip,idx)=>(
                              <div key={idx} className='flex m-1 items-center rounded-full bg-yellow-400 px-2 py-1 text-sm text-richblack-5'>
                                {
                                   chip
                                }
                                <button type='button' onClick={()=>handleDeleteChip(idx)}
                                    className='ml-2 focus:outline-none'>
                                     <MdClose className='text-sm'/>
                                </button>
                              </div>
                        ))
                    }

                    <input id={name} placeholder={placeholder} type='text' onKeyDown={handleKeyDown} name={name} className='form-style w-full' />
                </div>
                {
                    errors[name] && (
                        <span className='text-xs ml-2 tracking-wide text-pink-200'>{label} is required.</span>
                    )
                }
       </div>
     )
   }
   