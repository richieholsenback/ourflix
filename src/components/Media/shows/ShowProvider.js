import React, { useState, createContext } from "react"

export const ShowContext = createContext()


export const ShowProvider = (props) => {
    const [shows, setShows] = useState([])

    const getShows = () => {
        return fetch("https://unogsng.p.rapidapi.com/search?type=series&orderby=rating&audiosubtitle_andor=and&limit=100&subtitle=english&countrylist=78&audio=english&country_andorunique=unique&offset=0", {
            "method": "GET",
            "headers": {
                "x-rapidapi-key": "cd32ec05fbmsh6692bacfcb2a541p165764jsnbb20f354fae0",
                "x-rapidapi-host": "unogsng.p.rapidapi.com"
            }
        })
            .then(res => res.json())
            .then(res => res.results)
            .then(setShows)
    }

    return (
        <ShowContext.Provider value={{
            shows, getShows
        }}>
            {props.children}
        </ShowContext.Provider>
    )
}