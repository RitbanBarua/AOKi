import React, { useState } from "react"
import ErrorContext from "./ErrorContext"


export default function ErrorState(props) {
    const [errorState, setErrorState] = useState(false)
  return (
    <ErrorContext.Provider value={{errorState , setErrorState}}>
      {props.children}
    </ErrorContext.Provider>
  )
}
