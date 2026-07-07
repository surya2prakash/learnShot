export const formattDate = (date)=>{
     return new Date(date).toLocaleDateString("en-US",{
         month:"long",
         year:"numeric",
         day:"numeric"
     })
}