import React, { useEffect, useState } from 'react'
import {Swiper , SwiperSlide} from 'swiper/react'
import BannerImage1 from "../../assets/Images/aboutus1.webp"
import BannerImage2 from "../../assets/Images/aboutus2.webp"
import BannerImage3 from "../../assets/Images/aboutus3.webp"

import {Autoplay,FreeMode,Pagination} from "swiper/modules"
import { apiConnector } from '../../services/apiConnector'
import {ratingEndPoints} from "../../services/apis"
import ReactStars from "react-rating-stars-component"

export default function ReviewSlider() {
     
  const {REVIEW_DETAILS_API} =ratingEndPoints
  
  const [reviews,setReviews] = useState([]);

   useEffect(()=>{
     (async()=>{
        const result = await apiConnector("GET",REVIEW_DETAILS_API);
             
        console.log(result);

     })();
   },[]);

   const truncatewords =15

  return (
    <div className='text-white'>
        <div className='max-w-maxContentTab lg:max-w-maxContent my-[50px] h-[184px]'>
            <Swiper slidesPerView={4} spaceBetween={25} loop={true} freeMode={true} autoplay={{
               delay:2400,
               disableOnInteraction:false
            }} modules={[FreeMode,Pagination,Autoplay]} className='w-full' >
              {
                reviews.map((review,i)=>(
                    <SwiperSlide key={i}>
                         <div className="flex flex-col gap-3 bg-richblack-800 p-3 text-[14px] text-richblack-25">
                           <div className="flex items-center gap-4">
                            <img src={review?.user?.image ? review?.user?.image :  `https://api.dicebear.com/5.x/initials/svg?seed=${review?.user?.firstName} ${review?.user?.lastName}` } alt='' className='h-9 w-9 rounded-full object-cover'/>
                            <div className="flex flex-col">
                              <h1 className="font-semibold text-richblack-5">{`${review?.user?.firstName} ${review?.user?.lastName}`}</h1>
                              <h2 className="text-[12px] font-medium text-richblack-500">{review?.course?.courseName}</h2>
                            </div>
                           </div>
                           <p className="font-medium text-richblack-25">{review?.review.split(" ").length > truncatewords ? (`${review?.review.split(" ").slice(0,truncatewords).join(" ")} ...`) : (`${review?.review}`)}</p>
                           <div className="flex items-center gap-2 ">
                            <h3 className="font-semibold text-yellow-100">{review?.rating.toFixed(1)}</h3>
                              <ReactStars 
                               count={5}
                               value={review?.rating}
                               size={20}
                               activeColor="#ffd700"
                               emptyIcon={<FaStar />}
                               fullIcon={<FaStar />}
                               />
                           </div>

                         </div>
                    </SwiperSlide>
                ))
              }   
            </Swiper>

        </div>
          
    </div>
  )
}
