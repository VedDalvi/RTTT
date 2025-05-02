import React from 'react'
import img from './navbar/ico.png'
import spk from './images/speek.png'
import Navbar from './navbar/Navbar'
export default function About({isLoggedIn, setLoggedIn}) {
  return (
    <div>
        <Navbar isLoggedIn={isLoggedIn} setLoggedIn={setLoggedIn}/>
        <div className="container">
            <div className="about">
              <div className="title-about">
                <font>About Real Time Translator</font>
              </div>
              <div className="img-about">
                <img src={img} alt="Cinque Terre" width="300" height="300"/>
                <img className="spek" src={spk} alt=''/>
              </div>
            </div>
            <div className="about-content">
                <div className="para1">
                  Our language translation service aims to bridge linguistic barriers by providing seamless and accurate translations between English and Konkani. Leveraging natural language processing algorithms and deep learning frameworks, we ensure real-time translations while preserving the integrity and context of the original text.
                </div>
                <div className="para2">
                  <h1>Key Features:</h1>
                  <p>
                    <ul>
                      <li><b>Real-time Translation:</b> Instantaneous translation of text from English to Konkani.</li>
                      <li><b>Flexibility:</b> Support for various text formats, including documents and text extracted from images and support for video captioning.</li>
                      <li><b>Accuracy:</b> Utilize advanced algorithms to deliver precise translations, capturing nuances and context-specific meanings.</li>
                    </ul>
                  </p>
                </div>
                <div className="para3">
                  <h1>Objectives:</h1>
                  <p>
                    <ul>
                      <li><b>Translation Quality:</b> Maintain translation quality with a BLEU score between 0.4 to 0.5.</li>
                      <li><b>Consistency:</b> Provide consistent translations despite language nuances.</li>
                      <li><b>Input Versatility:</b> Translate both text and document inputs seamlessly.</li>
                      <li><b>User-Friendly Experience:</b> Offer intuitive features, such as storing frequently translated phrases for ease of use.</li>
                    </ul>
                  </p>
                </div>
                <div className="para4">
                  <h1>Technologies Used</h1>
                  <p>
                    <ul>
                      <li><b>For Front-end:</b> HTML, CSS for structuring and styling the website. React-JS for setting up routes and scripting of client side validations using Javascript.</li>
                      <li><b>Python: </b> OCR and Video captioning scripts were coded using Python due to its open source nature. For OCR pytesseract library and for captioning moviepy and speechRecognition Libraries were used.</li>
                      <li><b>For Back-end: </b> Node-JS was used to handle the Back-end operations such as file upload and storage into local server and storing user credentials.</li>
                    </ul>
                  </p>
                </div>
            </div>
            <div className="about-us">
              <h1>About Us</h1>
              <p>
                This project was created as a part of completion for <b>4 Years Bachelor's Degree</b> course in <b>Computer Engineering at Goa Engineering College</b>, Farmagudi, Goa.<br/><br/>
                <h4><b>Project Guide:</b> Prof. Sherica Lavinia Menezes, Assistant Professor, GEC.</h4><br/>
                <div className="members">
                  <h3>Team Members</h3>
                  <table>
                    <tr>
                      <th>Name</th>
                      <th>Roll No</th>
                      <th>email</th>
                      <th>Worked On</th>
                    </tr>
                    <tr>
                      <td>Ved Dalvi</td>
                      <td>201105076</td>
                      <td>veddalvi123@gmail.com</td>
                      <td>Testing</td>
                    </tr>
                    <tr>
                      <td>Anish Naik</td>
                      <td>201105007</td>
                      <td>anishhollowman17@gmail.com</td>
                      <td>OCR python script and Backend handling</td>
                    </tr>
                    <tr>
                      <td>Yatish Kunkolkar</td>
                      <td>201105081</td>
                      <td>yatishkunkolkar@gmail.com</td>
                      <td>Video captioning python script</td>
                    </tr>
                    <tr>
                      <td>Rutij Navelkar</td>
                      <td>201105047</td>
                      <td>navellarrutij@gmail.com</td>
                      <td>UI and Node JS(file upload to scripts for processing)</td>
                    </tr>
                  </table>
                </div>
              </p>
            </div>
        </div>
    </div>
  )
}
