import React, { useState } from 'react';
import ico from "./arrow.png"

function TextTranslation() {
  const options = ["English", "Konkani"];
  const [lang1, setLang1] = useState(options[0]);
  const [lang2, setLang2] = useState(options[1]);
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');

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
  
  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(inputText);
    try{
          const response = await fetch('http://localhost:3001/text', {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({"iptext": inputText})
      })
      const data = await response.json();

      if (response.ok) {
          console.log(data);
          setOutputText(data.translatedText);
      } else {
          alert('Text Translation failed');
          console.error(data);
      }
    }
    catch(err){
      console.log(err)
    }
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
              <textarea id="iptext" value={inputText} className="txtar1" onChange={(e) => setInputText(e.target.value)}  row="9" placeholder="Type to translate."/>
              <button type="submit" className="btn btn-primary">Translate to {lang2}</button>
            </form>
          </div>
          <div className="textar2">
            <textarea className="txtar2" value={outputText}  row="9" placeholder="Translation" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default TextTranslation;