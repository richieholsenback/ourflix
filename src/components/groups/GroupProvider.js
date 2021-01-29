import React, { useState, createContext } from "react"

/*
    The context is imported and used by individual components
    that need data
*/
export const GroupContext = createContext()

/*
 This component establishes what data can be used.
 */
export const GroupsProvider = (props) => {
    const [groups, setGroups] = useState([])

    const getGroups = () => {
        return fetch("http://localhost:8088/groups")
            .then(res => res.json())
            .then(setGroups)
    }

    const getGroupById = (id)=> {
        return fetch(`http://localhost:8088/groups/${id}`)
            .then(res => res.json())
    }

    /*
        You return a context provider which has the
        `locations` state, the `addLocation` function,
        and the `getLocation` function as keys. This
        allows any child elements to access them.
    */
    return (
        <GroupContext.Provider value={{
            groups, getGroups, getGroupById
        }}>
            {props.children}
        </GroupContext.Provider>
    )
}