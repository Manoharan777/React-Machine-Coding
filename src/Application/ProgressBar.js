import React, { useState, useEffect } from "react";

const ProgressBar = () => {
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let timer;
    if (loading) {
      timer = setInterval(() => {
        // Update progress
        setProgress((prevProgress) => {
          const newProgress = prevProgress + 5;
          return newProgress >= 100 ? 100 : newProgress;
        });
      }, 50); // Change the interval as needed
    }

    return () => clearInterval(timer);
  }, [loading]);

  const handleButtonClick = () => {
    setLoading(true);
  };

  return (
    
    <div className="w-64 mx-auto mt-8">
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        onClick={handleButtonClick}
      >
        {progress === 100
          ? "Loaded"
          : loading
          ? "Loading..."
          : "Load Progress Bar"}
      </button>
      {loading && (
        <div className="mt-4">
          <div className="relative pt-1">
            <div className="flex mb-2 items-center justify-between">
              <div>
                <span
                  className={`text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full ${
                    progress === 100
                      ? "text-green-600 bg-green-200"
                      : "text-blue-600 bg-blue-200"
                  }`}
                >
                  {progress === 100 ? "Done" : "In Progress"}
                </span>
              </div>
              <div className="text-right">
                <span className="text-xs font-semibold inline-block text-blue-600">
                  {`${progress}%`}
                </span>
              </div>
            </div>
            <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-blue-200">
              <div
                style={{ width: `${progress}%` }}
                className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500"
              ></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProgressBar;
