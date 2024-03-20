import React from 'react'
import Navbar from './navbar/Navbar';
import arr from './images/rightar.png'
import Format from './format/Format'
import Features from './features/Features'
import { Link } from 'react-router-dom';

export default function Homepage(props) {
  return (
    <div>
      <div style={{position:"fixed",zIndex:"1",width:"100%"}}>
        <Navbar />
      </div>
      <div className="container">
        <div className="layout1">
            <div className="layout1b">
                <font style={{top:'10px',position: 'relative'}}>Offers translation of <b>English Documents</b> to <b>Konkani</b>.<br/>Supports <b>plain text, documents</b> and <b>image</b> translations.<br/><br/>
                Also <b>video captioning</b> from <b>English to Konkani</b> is supported.</font>
            </div>
            <Link style={{textDecoration: 'none'}} to="/translate" className="button1"><img src={arr} alt="" /><font>TRANSLATE NOW</font></Link>
            <div className="layout1c">
              Reliable and hassle-free Translations
            </div>
        </div>
        <div className="layout2">
          <div className="layout2a">
            <font>Supported Formats</font>
            <div className="layout2a1">Upload your files in one of these formats.</div>
          </div>
          <div className="layout2b">
            <Format/>
          </div>
        </div>
        <div className="layout3">
          <div className="layout3a">
            <font>Features</font>
          </div>
          <Features/>
        </div>
      </div>
    </div>
  )
}