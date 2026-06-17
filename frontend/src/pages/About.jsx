import React from 'react'
import Footer from '../components/Common/Footer'
import HighlightText from '../components/core/HomePage/HighlightText'
import BannerImage1 from '../assets/Images/aboutus1.webp'
import BannerImage2 from '../assets/Images/aboutus2.webp'
import BannerImage3 from '../assets/Images/aboutus3.webp'
import Quote from '../components/core/AboutPage/Quote'
import FoundingStory from '../assets/Images/FoundingStory.png'

export default function About() {
  return (
    <div >
        {/* section-1 */}
          <section className='bg-richblack-700'>
            <div className='relative mx-auto flex w-11/12 max-w-maxContent flex-col justify-between gap-10 text-center text-white'>
                 <header className='mx-auto py-20 text-4xl font-semibold lg:w-[70%]'>
                    Driving Innovation in Online Education for a
                    <HighlightText text={"Brighter Future"} />
                    <p className='mx-auto mt-3 text-center text-base font-medium text-richblack-300 lg:w-[90%]'>
                        Studynotion is at the forefront of driving innovation in online
                        education. We're passionate about creating a brighter future by
                        offering cutting-edge courses, leveraging emerging technologies,
                        and nurturing a vibrant learning community.
                    </p>
                 </header>
                 <div className='sm:h-[70px] lg:h-[150px]'></div>
                 <div className='absolute bottom-0 left-[50%] w-full grid grid-cols-3 gap-3 lg:gap-5 translate-x-[-50%]  translate-y-[30%]'>
                    <img src={BannerImage1} alt="no" />
                    <img src={BannerImage2} alt="no" />
                    <img src={BannerImage3} alt="no" />
                 </div>

            </div>

          </section>
         {/* section -2 */}
          <section className='border-b border-richblack-700'>
            <div className='max-w-maxContent w-11/12 flex flex-col justify-between gap-10 text-richblack-500 mx-auto'>
                <div className='h-[100px]'></div>
                <Quote/>
            </div>

          </section>

          {/* section - 3 */}
          <section>
            <div>
                <div className='flex flex-row'>
                     <div>
                        <h1>Our Founding Story</h1>
                        <p> Our e-learning platform was born out of a shared vision and
                passion for transforming education. It all began with a group of
                educators, technologists, and lifelong learners who recognized
                the need for accessible, flexible, and high-quality learning
                opportunities in a rapidly evolving digital world.</p>
                <p>
                     As experienced educators ourselves, we witnessed firsthand the
                limitations and challenges of traditional education systems. We
                believed that education should not be confined to the walls of a
                classroom or restricted by geographical boundaries. We
                envisioned a platform that could bridge these gaps and empower
                individuals from all walks of life to unlock their full
                potential.
                </p>
                    </div>
                       <div>
                         <img src={FoundingStory} alt='no'/>
                    </div>
                </div>    
            </div>

          </section>
          <Footer/>
    </div>
  )
}
