import React, { useState, useEffect, useRef } from 'react';
import Navbar from './navbar/Navbar';
import Cards from './cards/Cards';
import TextTranslation from './translation/TextTranslate';
import FileTranslation from './translation/FileTranslate';
import ImageTranslation from './translation/ImageTranslate';
import VidTranslate from './translation/VidCaption'

export default function Translate({isLoggedIn, setLoggedIn}) {
  const [selectedOption, setSelectedOption] = useState(null);
  const componentRef = useRef(null);
  const handleOptionSelect = (option) => {
    if (componentRef.current && !componentRef.current.contains(option.target)) {
      setSelectedOption(false);
    } else {
      setSelectedOption(option);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleOptionSelect);
    return () => {
      document.removeEventListener('mousedown', handleOptionSelect);
    };
  }, []);
  return (
   <>
    <Navbar isLoggedIn={isLoggedIn} setLoggedIn={setLoggedIn}/>
      <div className="translate_bg">
        <Cards onSelectOption={handleOptionSelect} />
        {selectedOption === 'Translate Text' && <TextTranslation />}
        {selectedOption === 'Translate Files' && <FileTranslation />}
        {selectedOption === 'Translate Image' && <ImageTranslation />}
        {selectedOption === 'Video Captioning' && <VidTranslate />}
      </div>
    </>
  );
}