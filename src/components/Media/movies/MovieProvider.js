import React, { useState, createContext } from "react"

export const MovieContext = createContext()


export const MovieProvider = (props) => {
    const [movies, setMovies] = useState([])

    const getMovies = () => {
        return fetch("https://unogs-unogs-v1.p.rapidapi.com/aaapi.cgi?q=get%3Anew10000-!1940%2C2021-!0%2C5-!0%2C10-!0-!Movie-!Any-!Any-!gt100-!%7Bdownloadable%7D&t=ns&cl=all&st=adv&ob=Rating&p=1&sa=and", {
            "method": "GET",
            "headers": {
                "x-rapidapi-key": "cd32ec05fbmsh6692bacfcb2a541p165764jsnbb20f354fae0",
                "x-rapidapi-host": "unogs-unogs-v1.p.rapidapi.com"
            }
        })
            .then(res => res.json())
            .then(res => res.ITEMS)
            .then(setMovies)
    }

    return (
        <MovieContext.Provider value={{
            movies, getMovies
        }}>
            {props.children}
        </MovieContext.Provider>
    )
}