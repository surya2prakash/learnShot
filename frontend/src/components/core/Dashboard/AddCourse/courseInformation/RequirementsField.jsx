import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

export default function RequirementsField({name,label,getvalue,setValue,errors,register}) {

    const{editCourse,course}=useSelector(state=>state.course);
    const[requirement,setRequirement]= useState("");
    const [requirementsList,setRequirementsList]=useState([]);


    
    function handleAddRequirement(){
         if(requirement){
            setRequirementsList([...requirementsList,requirement]);
            setRequirement("");
         }
    }

    function handleRemoveRequirement(index){
            const updateRequirementList = [...requirementsList]

            // remove the item from the requirement list
               updateRequirementList.splice(index,1);
                // now set the requirement list after removing  
            setRequirementsList(updateRequirementList);
    }


    useEffect(()=>{
        setValue(name,requirementsList);

    },[requirementsList]);

  return (
    <div className='flex flex-col space-y-2'>
        <label className='text-sm text-richblack-5'>
            {label} <sup className='text-pink-200'>*</sup>
        </label>
        <div className='flex flex-col items-start space-y-2'>
            <input type='text' id={name} value={requirement} className='form-style w-full' onChange={(e)=>setRequirement(e.target.value)}/>
            <button className='font-semibold text-yellow-50' onClick={handleAddRequirement}>
                Add
            </button>
        </div>
           {
            requirementsList.length > 0  && (
                 <ul>
                    {
                        requirementsList.map((requirement,idx)=>(
                            <li key={idx} className='flex items-center text-richblack-5'>
                                <span>{requirement}</span>
                                <button type='button' className='ml-2 text-xs text-pure-greys-300' onClick={()=>handleRemoveRequirement(idx)}>
                                    clear
                                </button>
                            </li>      
                        ))
                    }
                 </ul>
            )
           }
           {
            errors.courseRequirements && (
                <span className='ml-2 text-xs tracking-wide text-pink-200'>
                     {label} is required
                </span>
            )
           }
    </div>
  )
}
