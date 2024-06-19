import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
function VideoTranslation() {
  const formRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [translatedFileUrl, setTranslatedFileUrl] = useState(null);

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
    validateAndSetVideo(file);
  };

  const handleVideoChange = (e) => {
    e.preventDefault();
  
    const file = e.target.files[0];
    validateAndSetVideo(file);
  };

  const validateAndSetVideo = (file) => {
    if (file) {
      console.log("Working");
      const validFormats = ['.mp4'];
      const extension = file.name.substring(file.name.lastIndexOf('.')).toLowerCase();
      if (validFormats.includes(extension)) {
        setSelectedVideo(file);
        console.log("File Submited",file.name);
        submitForm(file);
      } else {
        console.log("Error");
        alert('Invalid file format. Please upload only .mp4 files.');
      }
    }
  };

  const submitForm = async (file) => {
    const formData = new FormData();
    formData.append('video', file);
    try{
          const response = await fetch('http://localhost:3001/upload/video', {
            method: 'POST',
            body: formData,
      })
      const data = await response.json();

      if (response.ok) {
          console.log(data);
          setTranslatedFileUrl(data.translatedFileUrl);
      } else {
          alert('File upload failed');
          console.error(data);
      }
    }
    catch(err){
      console.log(err)
    }
  };

  return (
    <div>
      <div className={`container ${isDragging ? 'dragging' : ''}`}>
        <div className="space-videotr">
          <div className="videoupload" onDragOver={handleDragOver} onDragEnter={handleDragEnter} onDragLeave={handleDragLeave} onDrop={handleDrop}>
            <form ref={formRef}>
              <label align="center"><br />Drag and Drop <br />or</label>
              <label className="iolabel" htmlFor="videoupld" align="center">select a video to upload.</label>
              <input type="file" id="videoupld" style={{ display: "none" }} onChange={handleVideoChange} accept=".mp4" />
            </form>
            {selectedVideo && (
              <>
                <p align="center" className="dispvideoup">Video Submitted: {selectedVideo.name}</p>
                <p align="center" className="dispvidprogress">Please wait for the video to process</p>
              </>
            )}
            {translatedFileUrl && (
              <div className="dwvid">
                <Link to={translatedFileUrl} style={{ textDecoration: 'none'}} className="dwvidbutton" download>Download File</Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default VideoTranslation;