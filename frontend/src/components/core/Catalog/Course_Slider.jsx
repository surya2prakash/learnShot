import React from 'react'

import {Swiper,SwiperSlide} from 'swiper/react'
import Course_card from './Course_card';

import "swiper/css"
import "swiper/css/free-mode"
import "swiper/css/pagination"

import {FreeMode,Pagination} from 'swiper/modules'

export default function Course_Slider({courses}) {

  
  return (
    <div>
        {
              courses?.length ? (
                <Swiper
                slidesPerView={1}
                spaceBetween={25}
                loop={courses?.length >3 }
                modules={[FreeMode,Pagination]}
                breakpoints={
                    {
                        1024:{
                            slidesPerView:3
                        }
                    }
                }
                 className='max-h-[30rem]'
                >
                  {
                    courses?.map((course,i)=>(
                        <SwiperSlide key={i} >
                            <Course_card course={course} Height={"h-250px"}/>
                        </SwiperSlide>
                    ))
                  }  
                    
                </Swiper>
              ) : (<p className="text-xl text-richblack-5">No Course Found</p>)
        }
    </div>
  )
}
