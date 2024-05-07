import React, { useState } from "react";


const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <div className="text-left flex items-center">
        <button
          className=" ml-2 bg-black text-white p-1 m-1 rounded"
          onClick={toggleSidebar}
        >
          {isOpen ? "X" : "☰"}
        </button>
        <h1>Sidebar</h1>
      </div>
      <div className={isOpen ? "block" : "hidden"}>
        <ul>
          <li>Home</li>
          <li>About</li>
          <li>Services</li>
          <li>Contact</li>
        </ul>
      </div>
    </div>
  );
};


export default Sidebar;
