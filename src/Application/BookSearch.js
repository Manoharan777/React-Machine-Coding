import React, { useState, useEffect } from "react";


const Card = ({ booksdata }) => {
  if (!booksdata) return;
  const {volumeInfo } = booksdata;
  const { imageLinks, title, authors } = volumeInfo;
  return (
    <div className="bg-white text-black w-64 m-5 p-4 border hover:border-green-700 shadow-lg rounded-md bg-opacity-60 overflow-hidden transition-transform duration-300 ease-in-out transform hover:scale-105">
      <img
        src={imageLinks?.thumbnail}
        className="mx-auto items-center rounded"
        alt="user"
      />
      <h1 className="text-lg font-bold p-1 "> {title} </h1>
      <h4 className="text-sm font-semibold p-1 "> {authors} </h4>
    </div>
  );
};




function BookSearch() {
  const [query, setQuery] = useState("");
  const [books, setBooks] = useState([]);

  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };

   const handleSubmit = async () => {
     try {
       const response = await fetch(
         `https://www.googleapis.com/books/v1/volumes?q=${query}`
       );
       const data = await response.json();
       setBooks(data.items || []);
     } catch (error) {
       console.error("Error fetching books:", error);
     }
   };
  useEffect(() => {
   
    handleSubmit();
  }, []);

  return (
    <div className="text-center">
      <h1 className="bg-black text-white p-2 m-2 rounded font-bold text-2xl text-center">
        Book search Library
      </h1>
      <form onSubmit={(e) => e.preventDefault()}>
        <input
          className="border border-black m-2 p-2 w-48"
          type="text"
          value={query}
          onChange={handleInputChange}
          placeholder="Search for books..."
        />
        <button
          type="button"
          className="bg-black text-white p-2 m-2 rounded"
          onClick={handleSubmit}
        >
          Search
        </button>
      </form>
      <div className="flex flex-wrap  justify-center bg-black mx-2 mb-2 rounded">
        {books.map((books) => (
          <Card key={books.id} booksdata={books} />
        ))}
      </div>
    </div>
  );
}

export default BookSearch;
