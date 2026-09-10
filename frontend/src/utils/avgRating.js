export default function GetAverageRating(ratingArr) {
       
    if(ratingArr.length === 0){
        return 0
    };

    let totalReviewCount = ratingArr.reduce((acc,curr)=>{
          acc += curr?.rating ;
          return acc ;
    },0);

    const multiplier = Math.pow(10,1);
    
    const avgRatingCount = Math.round((totalReviewCount / ratingArr.length) * multiplier);

    return avgRatingCount ;
}