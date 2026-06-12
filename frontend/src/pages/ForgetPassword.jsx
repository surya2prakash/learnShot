import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { BiArrowBack } from "react-icons/bi"

export default function ForgetPassword() {

    const [email,setEmail] = useState("");
    const [emailSend,setEmailSend] = useState(false);

    function submitHandler(e){
        e.preventDefault();

        console.log(email);

        
         
    }

  return (
    <div className=' grid min-h-screen place-items-center'>

        <div className='max-w-[500px] p-4 lg:p-8'>
              <h1 className='text-[1.875rem] font-semibold leading-[2.375rem] text-richblack-5'>{emailSend ? "Rest your password":"Check email"}</h1>
              <p className='my-4 text-[1.275rem] leading-[1.625rem] text-richblack-100'>{emailSend ? "Have no fear. We'll email you instructions to reset your password. If you dont have access to your email we can try account recovery":`We have sent the reset email to ${email}`}</p>
              <form onSubmit={submitHandler}>
                 {
                    !emailSend && (
                         <label className='w-full' >
                    <p className='mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5'>Email Address</p>      
                      <input required type='text' placeholder='Enter email address' onChange={()=>setEmail(event.target.value)} name='email' value={email}
                        className='form-style w-full'/>
                  
                  <button className='mt-6 w-full rounded-[8px] bg-yellow-50 py-[12px] px-[12px] font-medium text-richblack-900 '>     
                       submit                    
                  </button>
                  </label>
                    )
                 }
              </form>
              <div className='mt-6 flex items-center justify-between'>
                 <Link to={"/login"} >
                 <p className=' flex gap-x-2 items-center justify-between text-richblack-5'> <BiArrowBack/> Back To Login</p>
                 </Link>
              </div>

        </div>

    </div>
  )
}
