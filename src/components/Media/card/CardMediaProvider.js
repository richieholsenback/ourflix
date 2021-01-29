import React, { useState, createContext } from "react"

export const MediaContext = createContext()


export const MediaProvider = (props) => {
    const [items, setItems] = useState([])

    const getItems = () => {
        return fetch("https://unogs-unogs-v1.p.rapidapi.com/aaapi.cgi?q=get%3Anew1-!1900%2C2021-!0%2C5-!0%2C10-!0-!Any-!Any-!Any-!gt200-!%7Bdownloadable%7D&t=ns&cl=78&st=adv&ob=Rating&p=1&sa=and", {
            "method": "GET",
            "headers": {
                "x-rapidapi-key": "cd32ec05fbmsh6692bacfcb2a541p165764jsnbb20f354fae0",
                "x-rapidapi-host": "unogs-unogs-v1.p.rapidapi.com"
            }
        })
            .then(res => res.json())
            .then(res => res.ITEMS)
            .then(setItems)
    }


    return (
        <MediaContext.Provider value={{
            items, getItems
        }}>
            {props.children}
        </MediaContext.Provider>
    )
}