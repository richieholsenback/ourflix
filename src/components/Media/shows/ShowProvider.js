import React, { useState, createContext } from "react"

export const ShowContext = createContext()


export const ShowProvider = (props) => {
    const [shows, setShows] = useState([])

    const getShows = () => {
        return fetch("https://unogs-unogs-v1.p.rapidapi.com/aaapi.cgi?q=get%3Anew10-!1900%2C2021-!0%2C5-!0%2C10-!0-!Series-!Any-!Any-!gt200-!%7Bdownloadable%7D&t=ns&cl=78&st=adv&ob=Rating&p=1&sa=and", {
            "method": "GET",
            "headers": {
                "x-rapidapi-key": "cd32ec05fbmsh6692bacfcb2a541p165764jsnbb20f354fae0",
                "x-rapidapi-host": "unogs-unogs-v1.p.rapidapi.com"
            }
        })
            .then(res => res.json())
            .then(res => res.ITEMS)
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