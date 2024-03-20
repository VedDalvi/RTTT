import React from 'react';

export default function Cdr(props) {
  return (
    <div>
      <div className="crd">
        <button className="bttn" onClick={props.onSelectOption}>
          <img src={props.ico} width="30" height="30" className="img-fluid" alt="" />
          <br />
          <font>{props.title}</font>
          <p>{props.desc}</p>
        </button>
      </div>
    </div>
  );
}