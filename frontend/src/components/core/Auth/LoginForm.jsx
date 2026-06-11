import React, { useState } from 'react'
 
import {Link} from 'react-router-dom'
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"

export default function LoginForm() {

  const [formData,setFormData] = useState({
      email:"",
      password:""
  });

  const[showPassword,setShowPassword] = useState(false);

  function changeHandler(e){
       setFormData((prevData)=>{
        return {...prevData , 
          [e.target.name]:e.target.value
        }
       })
  };

  function submitHandler (e){
       e.preventDefault();
       console.log(formData);
  }

  return (
    <form className='flex mt-6 w-full flex-col gap-y-4' onSubmit={submitHandler}>
      <label>
        <p className='mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5'>
            Email Address
            <sup className='text-pink-200'>*</sup>
        </p>

        <input type='text' required name='email' placeholder='Enter email address' className='form-style w-full' value={formData?.email} onChange={changeHandler}/>
      </label>
      <label  className='relative'>
        <p className='mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5'>
            Password
            <sup className='text-pink-200'>*</sup>
        </p>
        <input type={showPassword ? "text" :"password"} name='password' placeholder='Enter Password' className='form-style w-full' value={formData?.password} onChange={changeHandler} />
        <span
            onClick={()=> setShowPassword((prev)=>!prev)} className='absolute right-3 z-[10px] top-[38px]'>
             {
              showPassword ? (<AiOutlineEyeInvisible fontSize={24} fill='#AFB2BF'/>) : (<AiOutlineEye fontSize={24} fill='#AFB2BF'/>)
             }
        </span>
         <Link to={"/forget-password"}>
         <p className='mt-1 ml-auto max-w-max text-xs text-blue-100'>
             Forget Password
         </p>
         </Link>
      </label>
      <button className='mt-6 rounded-[8px] bg-yellow-50 py-[8px] px-[12px] font-medium text-richblack-900'>
            Sign In
      </button>

    </form>
  )
}
