import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { BiArrowBack } from "react-icons/bi"
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"

export default function UpdatePassword() {

  const [newPassword,setNewPassword] = useState("");
  const [confirmPassword,setConfirmPassword] = useState("");

  const[showPassword,setShowPassword] = useState(false);
  const[showConfirmPass,setShowConfirmPass] = useState(false);

function submitHandler(e){
        e.preventDefault();
      console.log("newPass ->",newPassword);
      console.log("confirmPass ->",confirmPassword);  
}

  return (
    <div className='min-h-[calc(100vh-3.5rem)]  grid place-items-center '>
          <div className='max-w-[500px] p-4 lg:p-8'>
             <h1 className='text-[1.875rem] font-semibold leading-[2.375rem] text-richblack-5'>Choose New Password</h1>
              <p className='my-4 text-[1.125rem] leading-[1.625rem] text-richblack-100'>Almost done. Enter new password and all set.</p>
               <form onSubmit={submitHandler}>
                     <label className='relative'>
                          <p className='mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5'>New Password <sup className="text-pink-200">*</sup></p>
                          <input type={showPassword ? "text" : "password"} placeholder='Enter new password' name='new_password' value={newPassword} onChange={(e)=>setNewPassword(e.target.value)}
                           required className='form-style w-full pr-10!'/>
                           <span onClick={()=> setShowPassword((prev)=>!prev)}
                             className='absolute right-3 top-[40px] z-[10] cursor-pointer lg:text-2xl'>
                            {
                                showPassword ? <AiOutlineEyeInvisible/> : <AiOutlineEye/>
                            }
                           </span>
                        </label> 
                      <label className='mt-3 relative block'>
                        <p className='mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5'>Confirm New Password <sup className="text-pink-200">*</sup></p>
                        <input type={showConfirmPass ? "text" : "password"} placeholder='Enter confirm password' name='confirm_new_password' value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)} required 
                           className='form-style w-full pr-10!'/>
                           <span onClick={()=>setShowConfirmPass((prev)=>!prev)}
                             className='absolute right-3 top-[40px] z-[10] cursor-pointer lg:text-2xl'>
                            {
                                 showConfirmPass ? <AiOutlineEyeInvisible/> : <AiOutlineEye/>
                            }
                           </span>
                        </label>  

                      <button type='submit' className='mt-6 w-full rounded-[8px] bg-yellow-50 py-[12px] px-[12px] font-medium text-richblack-900'> Reset Password
                        </button>  
                        
                     
               </form>

               <div className='mt-6 flex items-center justify-between'>
                  <Link to={"/login"} >
                      <p className='flex items-center gap-x-2 text-richblack-5'>
                         <BiArrowBack/>  Back To Login
                      </p>
                  </Link>
               </div>
          </div>
    </div>
  )
}
