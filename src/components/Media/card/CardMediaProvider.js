import React, { useState, createContext } from "react"

export const MediaContext = createContext()


export const MediaProvider = (props) => {
    const [results, setResults] = useState([])

    const getResults = () => {
        return fetch("https://unogsng.p.rapidapi.com/search?orderby=rating&countrylist=78&limit=100", {
            "method": "GET",
            "headers": {
                "x-rapidapi-key": "cd32ec05fbmsh6692bacfcb2a541p165764jsnbb20f354fae0",
                "x-rapidapi-host": "unogsng.p.rapidapi.com"
            }
        })
            .then(res => res.json())
            .then(res => res.results)
            .then(setResults)
    }


    return (
        <MediaContext.Provider value={{
            results, getResults
        }}>
            {props.children}
        </MediaContext.Provider>
    )
}