import React from 'react';

const SuccessPage = () => {
  return (
    <div className="bg-green-100 text-black h-screen flex justify-center items-center">
      <div className="bg-white  p-8 rounded-md flex items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 mr-2 text-green-600 dark:text-green-300"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <polyline points="20 6 9 17 4 12" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <div>
          <h2 className="text-lg font-semibold">Form submitted successfully</h2>
          <p>Data stored in local storage.</p>
        </div>
      </div>
    </div>
  );
};

export default SuccessPage;
