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
    validateAndSetImage(file);
  };

  const handleImageChange = (e) => {
    e.preventDefault();

    const file = e.target.files[0];
    validateAndSetImage(file);
  };

  const validateAndSetImage = (file) => {
    if (file) {
      const validFormats = ['.jpg', '.jpeg', '.png'];
      const extension = file.name.substring(file.name.lastIndexOf('.')).toLowerCase();
      if (validFormats.includes(extension)) {
        setSelectedImage(file);
        console.log("File Submited",file.name);
        submitForm();
      } else {
        console.log("Error");
        alert('Invalid file format. Please upload only .jpg, .jpeg, or .png files.');
      }
    }
  };

  const submitForm = async() => {
    const formData = new FormData();
    formData.append('image', selectedImage);
    try{
          const response = await fetch('http://localhost:3001/upload/image', {
            method: 'POST',
            body: formData,
      })
      const data = await response.json();

      if (response.ok) {
          alert('File uploaded successfully');
          console.log(data);
      } else {
          alert('File upload failed');
          console.error(data);
      }
    }
    catch(err){
      console.log(err)
    }
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