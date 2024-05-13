import React, { useEffect, useState } from 'react'
import "../App.css"
const StarRating = () => {
    const [rating,setRating] = useState(0);
    const [ count,setCount] = useState(0);


    useEffect(()=>{
      const storedCount = localStorage.getItem("starRatingCount");
      if(storedCount){
        setRating(parseInt(storedCount));
        setCount(parseInt(storedCount));
      }
    },[])

    const handleClick = (i) => {
setRating(i)
setCount(i);
localStorage.setItem("starRatingCount",i);
    }
    const Star = () => {
      let stars = [];
      for (let i = 0; i < 5; i++) {
        let isActive  = rating >= i+1;
        stars.push(
            <div key={i} className={`star  ${isActive ? "active" : ""}`}
            onClick={() => handleClick(i+1)}>
               {isActive ?<>&#9733;</> : <>&#9734;</> }
              
            </div>
           
        )
      }
    
      return stars;
    };


  return (
    <div className='starContainer flex justify-center'>
    <Star/>
    <p className='text-2xl font-bold ml-2 mt-8'>{count}</p>
    </div>
  )
}

export default StarRating