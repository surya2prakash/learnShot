import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { FiUploadCloud } from "react-icons/fi"
import {useDropzone} from 'react-dropzone'
import ReactPlayer from 'react-player'

export default function Upload({register,name,label,setValue,errors,editData=null,viewData=null,video=false}) {


   const {course} = useSelector(state=>state.course);

   const[selectedFile,setSelectedFile] = useState(null);

   const[previewSource,setPreviewSourse]= useState(viewData ? viewData : editData ? editData :"");

   const onDrop =(acceptFiles)=>{
      
       const file = acceptFiles[0];

       if(file){
            previewFile(file);
           setSelectedFile(file);
       }
       

   };

   const previewFile = (file)=>{
      const reader = new FileReader();

       reader.readAsDataURL(file);
       reader.onloadend=()=>{
         setPreviewSourse(reader.result);
       }

   }

   const {getInputProps,getRootProps,acceptedFiles}=useDropzone({
     accept: !video ? {"image/*":[".jpeg",".jpg",".png"]} : {"video/*":[".mp4"]},
     onDrop
   });

   const inputRef = useRef(null);


   useEffect(()=>{
        register(name,{ required:true })
   },[register,name]);

   useEffect(()=>{
    setValue(name,selectedFile);

   },[setValue,selectedFile,name])


  return (
    <div className='flex flex-col space-y-2'>
           <label className='text-sm text-richblack-5'>
           {label} {!viewData && <sup className='text-pink-200'>*</sup>}
            </label>   
            <div className={`flex min-h-[250px] cursor-pointer items-center justify-center rounded-md border-2 border-dotted border-richblack-500`}>
                {previewSource ? (
                    <div className='flex flex-col p-6 w-full'>
                      {
                        !video ? (<img src={previewSource} alt='Preview' 
                            className='rounded-md object-cover h-full w-full' />) : (<div><ReactPlayer controls src={previewSource}/></div>)
                      }
                      {
                        !viewData && (<button type='button' onClick={()=>{setPreviewSourse("")
                        setSelectedFile(null)
                        setValue(name,null)}}
                         className='mt-3 text-richblack-400 underline' >
                            cancel
                        </button>)
                      }
                    </div>
                    
                ) :(<div {...getRootProps()} className='flex flex-col items-center p-6'>
                    <input ref={inputRef} {...getInputProps()}/>

                    <div className='grid aspect-square w-14 place-items-center rounded-full bg-pure-greys-800'>
                        <FiUploadCloud className='text-2xl text-yellow-200'/>
                    </div>

                    <p className='mt-2 max-w-[200px] text-center text-sm text-richblack-200'>
                        Drag and Drop an {!video ?"image" : "video"}, or click to {" "} <span className='font-semibold text-yellow-50'>Browse</span> a file
                    </p>

                    <ul className='mt-10 flex list-disc justify-between space-x-12 text-center text-xs text-richblack-200'>
                        <li>Aspect ratio 16:9</li>
                        <li>Recomended Size 1024x576</li>
                    </ul>
                       
                </div>)}
                
            </div>
            {
                errors[name] && (<span className='ml-2 text-xs tracking-wide text-pink-200'>
                      {label} is required
                </span>)
            }
    </div>
  )
}
