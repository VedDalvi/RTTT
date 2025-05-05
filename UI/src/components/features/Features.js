import React from 'react'
import { Link} from "react-router-dom";
export default function Features() {
  return (
    <div>
        <div className="row row-cols-1 row-cols-md-3 g-4">
            <Link to="/translate" style={{textDecoration: "none",color:"black", fontFamily:'Fredoka'}}>
                <div className="col">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title"><font>Text Translations</font></h5>
                            <p className="card-text">Translate English written text into Konkani, aiding communication and understanding across language barriers.</p>
                        </div>
                    </div>
                </div>
            </Link>
            <Link to="/translate" style={{textDecoration: "none",color:"black", fontFamily:'Fredoka'}}>
                <div className="col">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title"><font>Document Translation</font></h5>
                            <p className="card-text">Translate text content from documents, such as PDFs or DOCX files, into another language while preserving formatting.</p>
                        </div>
                    </div>
                </div>
            </Link>
            <Link to="/translate" style={{textDecoration: "none",color:"black", fontFamily:'Fredoka'}}>
                <div className="col">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title"><font>Image Translation</font></h5>
                            <p className="card-text"> Extract text from images and translate it into another language, enabling understanding of text within visual content.</p>
                        </div>
                    </div>
                </div>
            </Link>
            <Link to="/translate" style={{textDecoration: "none",color:"black", fontFamily:'Fredoka'}}>
                <div className="col">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title"><font>Video Captioning</font></h5>
                            <p className="card-text">Generate subtitles or captions for English videos in Konkani language, enhancing accessibility and comprehension for viewers.</p>
                        </div>
                    </div>
                </div>
            </Link>
            <Link to="/user-translations" style={{textDecoration: "none",color:"black", fontFamily:'Fredoka'}}>
                <div className="col">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title"><font>View Previous Translations</font></h5>
                            <p className="card-text">Access a history of previously translated text,pdf or image allowing users to revisit and download translations for convenience and reference.</p>
                        </div>
                    </div>
                </div>
            </Link>
        </div>
    </div>
  )
}
