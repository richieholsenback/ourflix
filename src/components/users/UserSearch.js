import React, { useState } from "react"

export const UserSearch = () => {
    const [ searchTerms, setSearchTerms ] = useState("")

  return (
    <>
      <p>User search:</p>
      <input type="text"
        className="input--wide"
        onKeyUp={(event) => setSearchTerms(event.target.value)}
        placeholder="Search for a user... " />
    </>
  )
}