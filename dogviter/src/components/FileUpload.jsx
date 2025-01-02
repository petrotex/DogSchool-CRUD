import { useState } from "react";

function FileUpload({ buttonText = "Escolher Arquivo", placeholderText = "Nenhum arquivo selecionado", onFileChange, inputId }) {
  const [fileName, setFileName] = useState(placeholderText);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFileName(file ? file.name : placeholderText);

    if (onFileChange) {
      onFileChange(file);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <label 
        htmlFor={inputId}
        className="text-white bg-blue-600 hover:bg-blue-700 cursor-pointer py-2.5 px-4 rounded-md"
      >
        {buttonText}
      </label>
      
      <input 
        id={inputId} 
        className="hidden" 
        type="file" 
        accept="image/*" 
        onChange={handleFileChange}
      />
      
      <span className="rounded-md bg-slate-800 py-1 px-2.5 border border-transparent text-center text-sm text-white transition-all shadow-sm hover:shadow focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none mt-1 mb-2">
        {fileName}
      </span>
    </div>
  );
}

export default FileUpload;
