import React, { useEffect, useState } from 'react'
import Footer from '../components/Common/Footer'
import { useParams } from 'react-router-dom'
import { apiConnector } from '../services/apiConnector';
import { categories } from '../services/apis';
import {getPageCatalogData} from "../services/operations/pageAndComponentData"
import Course_card from '../components/core/Catalog/Course_card';
import Course_Slider from '../components/core/Catalog/Course_Slider';


export default function Catalog(){
     
    const {courseName} = useParams();
    
    const catalogName = courseName;

    const [categoryId,setCategoryId] = useState("");
    const [active ,setActive] = useState(1);
    const [catelogPageData,setCatelogPageData] = useState(null);

    useEffect(()=>{
          (
            async()=>{
                try{
                  const response = await apiConnector("GET",categories.CATEGORIES_API);
                     console.log(response);

                     const category_id = response?.data?.data?.filter((cat)=>cat?.categoryName.split(" ").join("-") === catalogName)[0]?._id;
                         console.log(category_id);
                        setCategoryId(category_id);
                }catch(error){
                     console.error(error);
                }
                
            }
          )();
    },[catalogName])


    useEffect(()=>{
        if(categoryId){
            getData(categoryId);
        }
        
        
       
    },[categoryId])

   

      async function getData(){
             const response = await getPageCatalogData(categoryId);
             
              
            setCatelogPageData(response);
        }

      return (

       <>
         <div className=" box-content bg-richblack-800 px-4">
            <div className="mx-auto flex min-h-[260px] max-w-maxContentTab flex-col justify-center gap-4 lg:max-w-maxContent ">
                <p className='text-sm text-richblack-300'>
                    {`Home / catalog /`}
                    <span className='text-yellow-25'>
                       {
                        
                       }
                    </span>
                </p>
                <p className='text-3xl text-richblack-5'>

                </p>
                <p className='max-w-[870px] text-richblack-200'>

                </p>
            </div>
            
         </div>

         {/* section 1 */}

         <div className='mx-auto box-content w-full max-w-maxContentTab px-4 py-12 lg:max-w-maxContent'>
            <div className='section_heading'>Courses to get you started</div>
            <div className='my-4 flex border-b border-b-richblack-600 text-sm'>
                <p className={`px-4 py-2 cursor-pointer ${active === 1 ? "border-b-yellow-25 text-yellow-25" : "text-richblack-50" }`} onClick={() => setActive(1)}>Most Popular</p>
                <p className={`px-4 py-2 cursor-pointer ${active === 2 ? "border-b-yellow-25 text-yellow-25" : "text-richblack-50" }`} onClick={()=> setActive(2)}>New</p>
            </div>

            <div>
                  {
                
                        <Course_Slider  courses={catelogPageData?.categoryDetail?.courseId}/>
                    
                  }
            </div>
         </div>

         {/* section 2 */}

         <div className='mx-auto box-content w-full max-w-maxContentTab px-4 py-12 lg:max-w-maxContent'>
             <div className='section_heading'> Top courses in {catelogPageData?.differentCategory?.categoryName}</div>
             <div className='py-8'>
                {
                  
                     <Course_Slider  courses={catelogPageData?.differentCategory?.courseId}/>
                
                }
             </div>
         </div>

          {/* section 3 */}

          <div className='mx-auto box-content w-full max-w-maxContentTab px-4 py-12 lg:max-w-maxContent'>
            <div className='section_heading'>Frequently Bought</div>
            <div className='py-8'>
                <div className='grid grid-cols-1 gap-6 lg:grid-cols-2'>
                    {
                        catelogPageData?.allCategory.map((course,i)=>(
                            <Course_card course={course} key={i} Height={"h-[400px]"}/>
                        ))
                    }
                </div>
            </div>
          </div>

          <Footer/>
         </> 
      )
}