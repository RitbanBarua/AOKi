import React, { useState } from "react"
import LoadingContext from "./LoadingContext"


export default function LoadingState(props) {
    const [loadingState, setLoadingState] = useState(false)
  return (
    <LoadingContext.Provider value={{loadingState , setLoadingState}}>
      {props.children}
    </LoadingContext.Provider>
  )
}
