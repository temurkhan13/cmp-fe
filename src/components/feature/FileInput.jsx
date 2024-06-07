import React, { useState } from "react";

const FileInput = () => {
  const [file, setFile] = useState(null);

  // Function to handle file selection from the input
  const handleFileInputChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };

  // Function to handle file drop
  const handleFileDrop = (e) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    setFile(droppedFile);
  };

  // Function to prevent default behavior for file drop
  const preventDefaultBehavior = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  // Function to handle file upload
  const handleUpload = () => {
    // You can implement file upload logic here, such as using FormData or sending the file to an API endpoint
    console.log("Uploading file:", file);
  };

  return (
    <>
      <div className="file-upload-container">
        <input
          type="file"
          id="file-input"
          onChange={handleFileInputChange}
          className="file-input"
        />
        <label htmlFor="file-input" className="file-input-label">
          Choose a file
        </label>
        <div
          className="file-drop-area"
          onDrop={handleFileDrop}
          onDragOver={preventDefaultBehavior}
        >
          Drag & Drop file here
        </div>
        {file && (
          <div className="file-info">
            <p>File Selected: {file.name}</p>
            <button onClick={handleUpload}>Upload</button>
          </div>
        )}
      </div>
    </>
  );
};

export default FileInput;
