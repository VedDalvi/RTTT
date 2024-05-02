import React, { useState } from 'react';
import ico from "./arrow.png"

function TextTranslation() {
  const options = ["English", "Konkani"];
  const [lang1, setLang1] = useState(options[0]);
  const [lang2, setLang2] = useState(options[1]);
  const [out_text, setText] = useState('');

  const textOutput = (event) => {
    const newState = event.target.value;
    setText(newState);
  };

  const handleLang1Change = (e) => {
    const selectedLang = e.target.value;
    setLang1(selectedLang);
    
    if (selectedLang === lang2) {
      setLang2(options.find(option => option !== selectedLang));
    }
  };

  const handleLang2Change = (e) => {
    const selectedLang = e.target.value;
    setLang2(selectedLang);

    if (selectedLang === lang1) {
      setLang1(options.find(option => option !== selectedLang));
    }
  };
  
  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <div>
      <div className="container">
        <div className="space-txttr">
          <div className="heading">
            <div className="select-custom">
              <select className="custom-select select-1" onChange={handleLang1Change} value={lang1}>
                {options.map((option, idx) => (
                  <option key={idx}>{option}</option>
                ))}
              </select>
              <select className="custom-select select-2" onChange={handleLang2Change} value={lang2}>
                {options.map((option, idx) => (
                  <option key={idx}>{option}</option>
                ))}
              </select>
            </div>
            <img src={ico} width="40" height="40" alt=""/>
          </div>
          <div className="textar1">
            <form onSubmit={handleSubmit}>
              <textarea className="txtar1" id="exampleFormControlTextarea1" onChange={textOutput}  row="9" placeholder="Type to translate."/>
              <button type="submit" className="btn btn-primary">Translate to {lang2}</button>
            </form>
          </div>
          <div className="textar2">
            <textarea className="txtar2" value={out_text} id="exampleFormControlTextarea1" row="9" placeholder="Translation" disabled/>
          </div>
        </div>
      </div>
    </div>
  );
}


export default TextTranslation;