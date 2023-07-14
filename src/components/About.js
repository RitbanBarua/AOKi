import React from 'react'
import Navbar from './Navbar'

export default function Catalogue() {
  
  document.title = "AOKi - About Us";

  return (
    <>
      <div className="container" id='about-us-container'>
        <Navbar />
        <div id="source-code-container">
          <p>Source Code :</p>
          <a href="https://github.com/RitbanBarua/AOKi.git" target='_blank' rel="noreferrer">
            <button title='GitHub'><i className="fa-brands fa-github fa-2xl" style={{ color: 'white' }}></i></button>
          </a>
        </div>
      </div>
    </>
  )
}
