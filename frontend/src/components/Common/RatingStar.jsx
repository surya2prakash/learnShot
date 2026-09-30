import React, { useEffect, useState } from 'react'

import {TiStarFullOutline,TiStarHalfOutline,TiStarOutline} from "react-icons/ti"



export default function ({review_count,star_size}) {

    const [starCount,setStarCount] = useState({
                                               full:0,
                                                 half:0,
                                                 empty:0
                                                  });


      useEffect(()=>{
          const wholeStars = Math.floor(review_count) || 0;

          setStarCount({
             full:wholeStars,
             half:Number.isInteger(review_count) ? 0 : 1 ,
             empty:Number.isInteger(review_count) ? 5-wholeStars : 4 - wholeStars
          })
      },[review_count]);                                            

  return (
    <div className=' flex gap-1 text-yellow-100'>
      {
        [...new Array(starCount.full)].map((_,i)=>(
              <TiStarFullOutline key={i} size={star_size || 20} />
  ))
      }
      {
         [...new Array(starCount.half)].map((_,i)=>(
              <TiStarHalfOutline key={i} size={star_size || 20} />
         ))
      }

      {
         [...new Array(starCount.empty)].map((_,i)=>(
              <TiStarOutline key={i} size={star_size || 20} />
         ))
      }

    
    </div>
  )
}
