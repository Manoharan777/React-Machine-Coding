import React, { useEffect, useState } from 'react'

const Card = ({userdata}) => {
  if(!userdata) return;
     const {email,gender,name,picture,location} = userdata;
    const {city,state,country} = location
    return (
      <div className="bg-white text-black w-64 m-5 p-4 border hover:border-green-700 shadow-lg rounded-md bg-opacity-60 overflow-hidden transition-transform duration-300 ease-in-out transform hover:scale-105">
        <img
          src={picture.large}
          className="mx-auto items-center rounded"
          alt="user"
        />
        <h1 className="text-lg font-bold p-1 "> {name.first} </h1>
        <h4 className="text-sm font-semibold p-1 "> {email} </h4>
        <h4 className="text-sm font-thin p-1 ">{gender} </h4>

        <address className="font-medium p-1 ">
          {city},{state},{country}
        </address>
      </div>
    );
}


const FecthingUsers = () => {

    const [userInfo,setUserInfo] = useState([]);

    const fetchuser = async () => {
const response = await fetch("https://randomuser.me/api/?results=20");
const data = await response.json();
//console.log(data.results);
setUserInfo(data.results);
    }


    useEffect(()=>{
        fetchuser();
    },[])

  return (
    <>
      <h1 className="bg-black text-white p-2 m-2 rounded font-bold text-2xl text-center">
       Fetching Data from Api
      </h1>
      <div className="flex flex-wrap  justify-center bg-black mx-2 mb-2 rounded">
        {userInfo.map((user, index) => (
          <Card key={index} userdata={user} />
        ))}
      </div>
    </>
  );
}

export default FecthingUsers