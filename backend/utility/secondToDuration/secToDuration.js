const convertSecToDuration = (totalSecond)=>{
       const hours = Math.floor(totalSecond / 3600) ;
       const minutes = Math.floor((totalSecond % 3600) / 60 ) ;
       const seconds = Math.floor((totalSecond % 3600) % 60) ;

       if(hours > 0){
          return `${hours}h ${minutes}m`
       }else if(minutes > 0){
          return `${minutes}m ${seconds}s`
       }else{
          return `${seconds}s`
       }
};

module.exports = convertSecToDuration ;