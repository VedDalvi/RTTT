import React from 'react'
import Cdr from './Crd'
import ico1 from './text.png'
import ico2 from './docs.png'
import ico3 from './img.png'
import ico4 from './vid.png'
export default function Cards({ onSelectOption }) {
  const handleOptionClick = (option) => {
    onSelectOption(option);
  };

  return (
    <div className="cards">
      <Cdr ico={ico1} title="Translate Text" desc="Translate plain text from English to Konkani" onSelectOption={() => handleOptionClick('Translate Text')} />
      <Cdr ico={ico2} title="Translate Files" desc="Translate '.docs' or '.pdf' files from English to Konkani" onSelectOption={() => handleOptionClick('Translate Files')} />
      <Cdr ico={ico3} title="Translate Images" desc="Translate images of documents from English to Konkani" onSelectOption={() => handleOptionClick('Translate Image')} />
      <Cdr ico={ico4} title="Video Captioning" desc="Translate video subtitles from English to Konkani" onSelectOption={() => handleOptionClick('Video Captioning')} />
    </div>
  );
}