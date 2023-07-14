import React from 'react'
import Navbar from './Navbar'

export default function Catalogue() {

  document.title = "AOKi - Catalogue";

  return (
    <>
      <div className="container">
        <Navbar />
        <div className="container" id="catalogue-container">This is catalogue. This feature will be added in future.</div>
      </div>
    </>
  )
}
