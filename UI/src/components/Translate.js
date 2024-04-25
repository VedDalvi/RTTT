import React, { useState } from 'react';
import Navbar from './navbar/Navbar';
import Cards from './cards/Cards';
import TextTranslation from './translation/TextTranslate';
import FileTranslation from './translation/FileTranslate';
import ImageTranslation from './translation/ImageTranslate';
import VidTranslate from './translation/VidCaption'

export default function Translate({isLoggedIn, setLoggedIn}) {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };

  return (
   <>
    <Navbar isLoggedIn={isLoggedIn} setLoggedIn={setLoggedIn}/>
    <div className="container">
      <Cards onSelectOption={handleOptionSelect} />
      {selectedOption === 'Translate Text' && <TextTranslation />}
      {selectedOption === 'Translate Files' && <FileTranslation />}
      {selectedOption === 'Translate Image' && <ImageTranslation />}
      {selectedOption === 'Video Captioning' && <VidTranslate />}
    </div>
    </>
  );
}