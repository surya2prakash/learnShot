import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import {Chart,registerables} from "chart.js"
import {Pie} from "react-chartjs-2"

Chart.register(...registerables);

export default function InstructorChart({courses}) {
   
  const {course} = useSelector(state => state.course);
        

    const [currChart,setCurrChart] = useState("students") ;

   const generateRandomColors = (numColours) =>{
      const colors = [];

      for(let i=0;i<numColours;i++){
          const color = `rgb(${Math.floor(Math.random()*256)},${Math.floor(Math.random()*256)},${Math.floor(Math.random()*256)})`

          colors.push(color);
      };

      return colors;
   } 
    
    const chartDataStudents = {
         labels:courses.map((course)=>course?.courseName),
         dataSets:[
          {
            data:courses.map((course)=>course?.totalStudentEnrolled),
            backgroundColor: generateRandomColors(courses.length)
          }
         ]
    }

    const chartIncomeData ={
          labels:courses.map((course)=>course?.courseName),
          dataSets:[
          {
            data:courses.map((course)=>course?.totalAmountGenrated),
            backgroundColor: generateRandomColors(courses.length)
          }
         ]
    }

    const options ={
        maintainAspectRatio :false
    }
    
  return (
    <div className='flex flex-col flex-1 gap-y-4 rounded-md  bg-richblack-800 p-6'>
        <p className='text-lg font-bold text-richblack-5'>Visualize</p>
        <div className='space-x-4 font-semibold'>
            <button  onClick={() => setCurrChart("students")}
          className={`rounded-sm p-1 px-3 transition-all duration-200 ${
            currChart === "students"
              ? "bg-richblack-700 text-yellow-50"
              : "text-yellow-400"
          }`}>
                 Students
            </button>
            <button onClick={() => setCurrChart("income")}
          className={`rounded-sm p-1 px-3 transition-all duration-200 ${
            currChart === "income"
              ? "bg-richblack-700 text-yellow-50"
              : "text-yellow-400"
          }`}>
                 Income
            </button>
        </div>
        <div>
            <Pie data={currChart === "students" ? chartDataStudents : chartIncomeData} options={options} />
        </div>
    </div>
  )
}
