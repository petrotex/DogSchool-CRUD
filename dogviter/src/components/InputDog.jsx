// InputField.js
import React from 'react';

const InputField = ({ value, onChange, placeholder, type = 'text', isTextArea = false }) => {
  if (isTextArea) {
    return (
      <textarea
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="text-black placeholder-gray-600 w-full px-1 py-1 text-base
          transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200 
          focus:border-blueGray-500 focus:bg-white focus:outline-none 
          focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 ring-gray-400"
      />
    );
  }

  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className="text-black placeholder-gray-600 w-full px-1 py-1 text-base
        transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200 
        focus:border-blueGray-500 focus:bg-white focus:outline-none 
        focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 ring-gray-400"
    />
  );
};

export default InputField;