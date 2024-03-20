import React, { useState, useRef } from 'react';

function ImageTranslation() {
  const formRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  //const [imageURL, setImageURL] = useState(null);

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
    setSelectedImage(file);
    submitForm(e);
  };

  const handleImageChange = (e) => {
    e.preventDefault();

    const file = e.target.files[0];
    setSelectedImage(file);
    //displayImage(file);
    submitForm(e);
  };

  const submitForm = (event) => {
    event.preventDefault();
    // Your form submission logic
  };

  /*const displayImage = (file) => {
    const imageURL = URL.createObjectURL(file);
    setImageURL(imageURL);
  };*/

  return (
    <div>
      <div className={`container ${isDragging ? 'dragging' : ''}`}>
        <div className="space-imgtr">
          <div className="imgupload" onDragOver={handleDragOver} onDragEnter={handleDragEnter} onDragLeave={handleDragLeave} onDrop={handleDrop}>
            <form ref={formRef}>
              <label align="center"><br />Drag and Drop <br />or</label>
              <label className="iolabel" htmlFor="imageupld" align="center">select an image to upload.</label>
              <input type="file" id="imageupld" style={{ display: "none" }} onChange={handleImageChange} alt="" accept=".jpg, .png, .jpeg" />
            </form>
            {selectedImage && (
              /*<img className="imgdisp" src={imageURL} alt="Selected" style={{ maxWidth: '100%', maxHeight: '200px' }}/>  --add this in below jsx to display image*/
              <>
                <p align="center" className="dispimgup">Image Submitted: {selectedImage.name}</p>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ImageTranslation;