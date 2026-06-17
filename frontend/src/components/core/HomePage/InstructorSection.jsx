import React from 'react'

import Instructor from '../../../assets/Images/Instructor.png'
import HighlightText from './HighlightText'
import Button from './Button'

import { FaArrowAltCircleRight } from "react-icons/fa";

export default function InstructorSection() {
  return (
    <div>
        <div className=' flex flex-col lg:flex-row gap-20 items-center'>
            <div className='lg:w-[50%]'>
                 <img src={Instructor} alt=''
                   className=' shadow-white shadow-[-20px_20px_0px_0px]' />
            </div>

            <div className='lg:w-[50%] flex gap-10 flex-col'>
                <h1 className='lg:w-[50%] font-semibold text-4xl'>
                    Become an
                    <HighlightText text={"instructor"}/>
                </h1>

                <p className='font-medium text-[16px] text-justify w-[90%] text-richblack-300'>
                     Instructors from around the world teach millions of students on
                     StudyNotion. We provide the tools and skills to teach what you
                      love.
                </p>
                <div className='w-fit'>
                     <Button active={true} linkTo={"/signup"}>
                     <div className='flex items-center gap-3'>
                        Start Teaching Today
                        <FaArrowAltCircleRight/>
                     </div>
                     </Button>
                </div>
            </div>

        </div>
          
    </div>
  )
}
