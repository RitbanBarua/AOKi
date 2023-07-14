import React, { useState } from "react"
import EpisodeIndexContext from "./EpisodeIndexContext"

export default function EpisodeIndex(props) {
    const [episodeIndex, setEpisodeIndex] = useState(0)
  return (
    <EpisodeIndexContext.Provider value={{episodeIndex , setEpisodeIndex}}>
      {props.children}
    </EpisodeIndexContext.Provider>
  )
}