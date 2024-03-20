import React, { useState, useRef } from 'react';

function VideoTranslation() {
  const formRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState(null);

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
    setSelectedVideo(file);
    submitForm(e);
  };

  const handleVideoChange = (e) => {
    e.preventDefault();

    const file = e.target.files[0];
    setSelectedVideo(file);
    submitForm(e);
  };

  const submitForm = (event) => {
    event.preventDefault();
  };

  return (
    <div>
      <div className={`container ${isDragging ? 'dragging' : ''}`}>
        <div className="space-videotr">
          <div className="videoupload" onDragOver={handleDragOver} onDragEnter={handleDragEnter} onDragLeave={handleDragLeave} onDrop={handleDrop}>
            <form ref={formRef}>
              <label align="center"><br />Drag and Drop <br />or</label>
              <label className="iolabel" htmlFor="videoupld" align="center">select a video to upload.</label>
              <input type="file" id="videoupld" style={{ display: "none" }} onChange={handleVideoChange} accept=".mp4, .mkv, .avi" />
            </form>
            {selectedVideo && (
              <>
                <p align="center" className="dispvideoup">Video Submitted: {selectedVideo.name}</p>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default VideoTranslation;