import React from 'react'
import LoginForm from './LoginForm'
import SignForm from './SignForm'
import frameImg  from '../../../assets/Images/frame.png'

export default function Template({title,description1,description2,image,formType}) {
  return (
    <div className='grid min-h-screen place-items-center'>
        <div className='mx-auto flex w-11/12 max-w-maxContent flex-col-reverse justify-between gap-y-12 py-12 md:flex-row md:gap-y-0 md:gap-x-12'>
            <div className='mx-auto w-11/12 max-w-[450px] md:mx-0'>
                <h1 className='text-[1.8rem] font-semibold leading-[2.375rem] text-richblack-5'>
                    {title}
                    </h1>
            
                <p className='mt-4 text-[1.125rem]'>
                    <span className='text-richblack-100'>{description1}</span>{" "}
                    <span className='font-edu-sa text-blue-100 italic font-bold'>{description2}</span>
                </p>
                {formType === "signup" ?  <SignForm/> : <LoginForm/>}
            </div>
        

        <div className='relative mx-auto w-11/12 max-w-[420px] md:mx-0 hidden lg:block '>
            <img src={frameImg} alt='Pattern' height={510} width={560} loading='lazy' className='absolute top-16 ' />
            <img src={image} alt='Students' height={510} width={560} className='absolute top-12 right-4 z-10'/>
        </div>
         
        </div>
    </div>
  )
}
