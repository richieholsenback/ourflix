import React, { useState, createContext } from "react"
import firebase from "firebase/app";
import { firebaseConfig } from '../../fbAuth/FirebaseConfig'

console.log("fb",firebase);
const dataURL = firebaseConfig.databaseURL;


export const MediaContext = createContext()

export const MediaProvider = (props) => {
    const [items, setItems] = useState([])

    const getItems = () => {
        return fetch("https://unogs-unogs-v1.p.rapidapi.com/aaapi.cgi?q=get%3Anew100-!1900%2C2021-!0%2C5-!0%2C10-!0-!Any-!Any-!Any-!gt100-!%7Bdownloadable%7D&t=ns&cl=78&st=adv&ob=Relevance&p=1&sa=and", {
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