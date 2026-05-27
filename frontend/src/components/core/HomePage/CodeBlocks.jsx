import React from 'react'
import Button from './Button'
import  {TypeAnimation}  from 'react-type-animation'
import { FaArrowAltCircleRight } from "react-icons/fa";

export default function CodeBlocks({position,heading,subHeading,ctabtn1,ctabtn2,codeColor,codeBlock,backGroundGradient}) {
  return (
    <div className={`flex ${position} my-20 justify-between flex-col lg:gap-10 gap-10`}>

             <div className="w-full lg:w-[50%] flex flex-col gap-8">
                  {heading}

                  <div className='text-richblack-300 text-base font-bold w-[85%] -mt-3'>
                    {
                       subHeading
                    }
                  </div>

                  <div className='flex gap-7 mt-7'>
                      <Button active={ctabtn1.active} linkTo={ctabtn1.linkTo}>
                        <div className='flex gap-2 items-center'>
                              {
                                ctabtn1.btnText
                              }
                              <FaArrowAltCircleRight/>
                        </div>
                      </Button>
                      <Button active={ctabtn2.active} linkTo={ctabtn2.linkTo}>
                          
                             {
                                ctabtn2.btnText
                             }
                          
                      </Button>
                  </div>

             </div>

             <div className='flex code-border h-fit  flex-row py-3 text-[10px] sm:text-sm leading-4.5 sm:leading-6 relative w-full lg:w-[470px]'>
                {backGroundGradient}
                   <div className='text-center flex flex-col   w-[10%] select-none text-richblack-400 font-inter font-bold '>
                       <p>1</p>
                       <p>2</p>
                       <p>3</p>
                       <p>4</p>
                       <p>5</p>
                       <p>6</p>
                       <p>7</p>
                       <p>8</p>
                       <p>9</p>
                       <p>10</p>
                       <p>11</p>
                   </div>
                    <div className={`w-[90%] flex flex-col gap-2 font-bold font-mono ${codeColor} pr-1`} >
                        <TypeAnimation 
                        repeat={Infinity}
                          sequence={[
                             codeBlock,
                             1000,
                             ""
                            
                          ]
                          }
                          cursor={true}
                          omitDeletionAnimation={true}
                          style={ {whiteSpace: "pre-line",
                                       display: "block",}}
                        />

                    </div>
             </div>

    </div>
  )
}
