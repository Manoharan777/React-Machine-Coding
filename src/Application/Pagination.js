import React, { useState, useEffect } from "react";


const RepositoryList = () => {
  const [repositories, setRepositories] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchRepositories = async () => {
      try {
        const response = await fetch(
          `https://api.github.com/search/repositories?q=react&page=${page}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch repositories");
        }
        const data = await response.json();
        setRepositories(data.items);
        const totalPages = Math.ceil(data.total_count / 30);
        setTotalPages(totalPages); // Calculate total pages based on items per page
      } catch (error) {
        console.error("Error fetching repositories:", error);
      }
    };

    fetchRepositories();
  }, [page]);

  const handlePreviousPage = () => {
    setPage((prevPage) => prevPage - 1);
  };

  const handleNextPage = () => {
    setPage((prevPage) => prevPage + 1);
  };

  return (
    <div className="text-center">
      <h1 className="bg-black text-white p-2 m-2 rounded font-bold text-2xl text-center">
        Repository List
      </h1>
      <ul>
        {repositories.map((repo) => (
          <li key={repo.id}>{repo.full_name}</li>
        ))}
      </ul>
      <div>
        <button
          className="bg-black text-white p-2 mx-2 rounded"
          onClick={handlePreviousPage}
          disabled={page === 1}
        >
          Previous
        </button>
        <span>{`Page ${page} of ${totalPages}`}</span>
        <button
          onClick={handleNextPage}
          disabled={page === totalPages}
          className="bg-black text-white p-2 mx-2 mt-2 rounded"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default RepositoryList;
