import React, {useState} from 'react'

function FileTranslate() {
  const [isDragging, setIsDragging] = useState(false);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  const allowedFileTypes = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragEnter = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files[0];
    handleFile(file);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setUploadedFile(null);
    handleFile(file);
  };

  const handleFile = (file) => {
    if (file) {
      if (allowedFileTypes.includes(file.type)) {
        setUploadedFile(file); 
        setErrorMessage('');
      } else {
        setUploadedFile(null);
        alert('Invalid file type. Please upload a PDF or DOCX file.');
      }
    }
  };
  
  const handleSubmit = (event) => {
    event.preventDefault();
    if (uploadedFile) {
      console.log("File submitted");
      alert("File submitted", uploadedFile);
    }
  };
  
  return (
    <div>
      <div className={`container ${isDragging ? 'dragging' : ''}`}>
        <div className="space-filetr">
          <div className="fileupload" onDragOver={handleDragOver} onDragEnter={handleDragEnter} onDragLeave={handleDragLeave} onDrop={handleDrop}>
            <form onSubmit={handleSubmit}>
              <label align="center">Drag and Drop <br/>or<br/><br/></label>        
              <div className="input-group">
                <input type="file" className="form-control" id="inputGroupFile04" aria-label="Upload file" onChange={handleFileChange} accept=".pdf, .docx"/>
                <button className="btn btn-primary" type="submit" id="inputGroupFileAddon04" style={{marginLeft:"20px"}} disabled={!uploadedFile}>Upload</button>
              </div>
            </form>
            {errorMessage && (
              <div>
                <p style={{ color: 'red' }}>{errorMessage}</p>
              </div>
            )}
            {uploadedFile && !errorMessage && (
              <div>
                <p>File Uploaded: {uploadedFile.name}</p>
              </div>
            )}
          </div> 
        </div>
      </div>
    </div>
  )
}

export default FileTranslate;