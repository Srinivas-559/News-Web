import React from 'react';

const PaginationControls = ({ currentPage, totalResults, articlesPerPage, onNext, onPrevious }) => (
  <div className="flex justify-center mt-10 space-x-4">
    <button
      className={`px-6 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 ${
        currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''
      }`}
      onClick={onPrevious}
      disabled={currentPage === 1}
    >
      Previous
    </button>
    <button
      className={`px-6 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 ${
        currentPage * articlesPerPage >= totalResults ? 'opacity-50 cursor-not-allowed' : ''
      }`}
      onClick={onNext}
      disabled={currentPage * articlesPerPage >= totalResults}
    >
      Next
    </button>
  </div>
);

export default PaginationControls;
