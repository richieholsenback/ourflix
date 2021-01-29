import React, { useState, createContext } from "react"

/*
    The context is imported and used by individual components
    that need data
*/
export const FriendContext = createContext()

/*
 This component establishes what data can be used.
 */
export const FriendProvider = (props) => {
    const [friends, setFriend] = useState([])

    const getFriends = () => {
        return fetch("http://localhost:8088/friends?_expand=user")
            .then(res => res.json())
            .then(setFriend)
    }

    /*
        You return a context provider which has the
        `locations` state, the `addLocation` function,
        and the `getLocation` function as keys. This
        allows any child elements to access them.
    */
    return (
        <FriendContext.Provider value={{
            friends, getFriends
        }}>
            {props.children}
        </FriendContext.Provider>
    )
}