import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from "react-redux";
import "../App.css"
import { addRating } from '../Store/starSlice';
const StarRating = () => {
    const [rating,setRating] = useState(0);
    const [ count,setCount] = useState(0);
    const dispatch = useDispatch();
   const ratingcount  = useSelector((store)=> store.star.rating)

    useEffect(()=>{
  
      if(ratingcount){
        setRating(parseInt(ratingcount));
      }
    },[])

    const handleClick = (i) => {
setRating(i)
//setCount(i);
dispatch(addRating(i));
//localStorage.setItem("starRatingCount",i);
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
    <div className="starContainer flex justify-center">
      <Star />
      <p className="text-2xl font-bold ml-2 mt-8">{ratingcount}</p>
    </div>
  );
}

export default StarRating