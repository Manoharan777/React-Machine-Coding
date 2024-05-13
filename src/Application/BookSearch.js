import React, { useState, useEffect } from "react";

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
      <ul className="flex flex-wrap justify-between">
        {query &&
          books.map((book) => (
            <li key={book.id}>
              <div>
                {book.volumeInfo && book.volumeInfo.imageLinks && (
                  <img
                    className="mx-auto"
                    src={book.volumeInfo.imageLinks.thumbnail}
                    alt={book.volumeInfo.title}
                  />
                )}
              </div>
              <div>
                <h2>
                  {book.volumeInfo
                    ? book.volumeInfo.title
                    : "Title not available"}
                </h2>
                <p>
                  Authors:{" "}
                  {book.volumeInfo && book.volumeInfo.authors
                    ? book.volumeInfo.authors.join(", ")
                    : "Author not available"}
                </p>
              </div>
            </li>
          ))}
      </ul>
    </div>
  );
}

export default BookSearch;
