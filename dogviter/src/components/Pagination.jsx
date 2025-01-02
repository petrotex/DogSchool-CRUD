// src/components/Pagination.js
import React from 'react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  return (
    <ul className="flex space-x-5 justify-center font-[sans-serif]">
      <li
        className="flex items-center justify-center shrink-0 bg-gray-100 w-10 h-10 rounded-full cursor-pointer"
        onClick={() => handlePageChange(currentPage - 1)}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="w-3 fill-gray-950" viewBox="0 0 55.753 55.753">
          <path
            d="M12.745 23.915c.283-.282.59-.52.913-.727L35.266 1.581a5.4 5.4 0 0 1 7.637 7.638L24.294 27.828l18.705 18.706a5.4 5.4 0 0 1-7.636 7.637L13.658 32.464a5.367 5.367 0 0 1-.913-.727 5.367 5.367 0 0 1-1.572-3.911 5.369 5.369 0 0 1 1.572-3.911z"
          />
        </svg>
      </li>
      {[...Array(totalPages)].map((_, index) => (
        <li
          key={index + 1}
          className={`flex items-center justify-center shrink-0 ${currentPage === index + 1 ? 'bg-blue-500 text-white' : 'hover:bg-gray-50 border-2 cursor-pointer text-base font-bold text-[#3a95b1]'} w-10 h-10 rounded-full`}
          onClick={() => handlePageChange(index + 1)}
        >
          {index + 1}
        </li>
      ))}
      <li
        className="flex items-center justify-center shrink-0 hover:bg-gray-50 border-2 cursor-pointer w-10 h-10 rounded-full"
        onClick={() => handlePageChange(currentPage + 1)}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="w-3 fill-gray-950 rotate-180" viewBox="0 0 55.753 55.753">
          <path
            d="M12.745 23.915c.283-.282.59-.52.913-.727L35.266 1.581a5.4 5.4 0 0 1 7.637 7.638L24.294 27.828l18.705 18.706a5.4 5.4 0 0 1-7.636 7.637L13.658 32.464a5.367 5.367 0 0 1-.913-.727 5.367 5.367 0 0 1-1.572-3.911 5.369 5.369 0 0 1 1.572-3.911z"
          />
        </svg>
      </li>
    </ul>
  );
};

export default Pagination;