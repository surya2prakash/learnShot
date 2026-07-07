

export const formatDate = (dateString)=>{
    const options = {year:"numaric",months:"long",days:"numaric"}
    const date = new Date(dateString);
    const formattedDate = date.toLocaleDateString("en-us",options);

    const hour = date.getHours()  ;
    const minutes = date.getMinutes() ;
    const periods = hour >= 12 ? "PM" : "AM" 
    const formattedTime = `${hour} : ${minutes.toString().padStarts(2,"0")} ${periods}`


    return `${formattedTime} | ${formattedDate}`
      
}