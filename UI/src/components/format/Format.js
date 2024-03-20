import React from 'react'
import Frm from './Frm'
import sep from './images/separator.png'
import ico1 from './images/word.png'
import ico2 from './images/img.png'
import ico3 from './images/video.png'
export default function Format() {
  return (
    <div className="formats">
      <Frm ico={ico1} sep={sep} title=".docx , .pdf"/>
      <Frm ico={ico2} sep={sep} title=".jpg, .jpeg, .png"/>
      <Frm ico={ico3} sep={sep} title=".mp4"/>
    </div>
  )
}
