import React, { useState } from "react";

export default function SwappingList() {
  const [list1, setList1] = useState([
    { title: "item 1", checked: false },
    { title: "item 2", checked: false },
    { title: "item 3", checked: false },
  ]);
  const [list2, setList2] = useState([
    { title: "item A", checked: false },
    { title: "item B", checked: false },
    { title: "item C", checked: false },
  ]);

  function handlecheckbox(id) {
    var updatedlist1 = [...list1];
    updatedlist1[id].checked = !updatedlist1[id].checked;
    setList1(updatedlist1);
  }

  function handleswap() {
    var updatedlist1 = [...list1];
    var updatedlist2 = [...list2];
    updatedlist1.forEach((item, index) => {
      if (item.checked) {
        // var temp = updatedlist1[index].title;
        // updatedlist1[index].title = updatedlist2[index].title;
        // updatedlist2[index].title = temp;
        [updatedlist1[index].title, updatedlist2[index].title] = [
          updatedlist2[index].title,
          updatedlist1[index].title,
        ];
        updatedlist1[index].checked = false;
      }
    });
    setList1(updatedlist1);
    setList2(updatedlist2);
  }

  return (
    <div className="text-center">
      <div>
        <h1 className="bg-black text-white p-2 m-2 rounded font-bold text-2xl text-center">
          Swapping list
        </h1>
        <h1 className="text-xl m-2 p-2 font-bold ">List 1</h1>
        <ul>
          {list1.map((item, index) => (
            <li className="p-1 m-2" key={index}>
              <input
                type="checkbox"
                className="mr-2"
                checked={item.checked}
                onChange={() => handlecheckbox(index)}
              />
              {item.title}
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h1 className="text-xl m-2 p-2 font-bold ">List 2</h1>
        <ul className="m-2">
          {list2.map((item, index) => (
            <li className="p-1 m-2" key={index}>
              {item.title}
            </li>
          ))}
        </ul>
      </div>
      <button
        className="bg-black text-white p-2 mx-2 rounded"
        onClick={handleswap}
      >
        swap the item
      </button>
    </div>
  );
}
