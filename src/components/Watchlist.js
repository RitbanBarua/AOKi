import React from 'react'
import Navbar from './Navbar'

export default function Catalogue() {

  document.title = "AOKi - Watchlist";

  return (
    <>
      <div className="container">
        <Navbar />
        <div className="container" id="watchlist-container">This is Watchlist. This feature will be added in future.</div>
      </div>
    </>
  )
}
