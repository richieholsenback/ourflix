import React, { useState, createContext } from "react"

export const MovieContext = createContext()


export const MovieProvider = (props) => {
    const [movies, setMovies] = useState([])

    const getMovies = () => {
        return fetch("https://unogsng.p.rapidapi.com/search?type=movie&orderby=rating&audiosubtitle_andor=and&limit=100&subtitle=english&countrylist=78&audio=english&country_andorunique=unique&offset=0", {
            "method": "GET",
            "headers": {
                "x-rapidapi-key": "cd32ec05fbmsh6692bacfcb2a541p165764jsnbb20f354fae0",
                "x-rapidapi-host": "unogsng.p.rapidapi.com"
            }
        })
            .then(res => res.json())
            .then(res => res.results)
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