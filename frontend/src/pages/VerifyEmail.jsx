import React, { useState } from 'react'
import OtpInput from 'react-otp-input'

export default function VerifyEmail() {

  const[otp,setOtp] = useState("");

  

function otpSubmitHandler(event){
    event.preventDefault();
    console.log(otp);
}

  return (
    <div className='min-h-[calc(100vh-3.5rem)] grid place-items-center'>
        <div className='max-w-[500px] p-4 lg:p-8'>
            <h1 className='text-richblack-5 font-semibold text-[1.875rem] leading-[2.375rem]'>Verify Email</h1>
            <p className='text-[1.125rem] leading-[1.625rem] my-4 text-richblack-100'>A Verification code has been sent to you . Enter the code below</p>
            <form onSubmit={otpSubmitHandler}>
              <OtpInput

               value={otp}
               numInputs={6}
               renderInput={(props)=>(<input {...props}
                  placeholder='-'
                    style={{
                    boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                  }}
                   className='w-[48px] lg:w-[60px] border-0 bg-richblack-800 rounded-[0.8rem] text-richblack-5 aspect-square text-center focus:border-0 focus:outline-2 focus:outline-yellow-50'
                  />)}
              onChange={setOtp}
              containerStyle={{
                justifyContent:"space-between",
                gap:"0 6px"
              }
              }
                 
              />
                 
            </form>
        </div>
    </div>
  )
}
