import React from 'react'
export default function Frm(props) {
  return (
    <div className="pad">
      <div className="frm">
           <img src={props.ico} width="100" height="100" className="img-fluid" alt=""></img><br/><img src={props.sep} width="100" height="10" className="img-fluid" alt=""></img><br/><font>{props.title}</font>
      </div>
    </div>
  )
}
