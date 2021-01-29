import React, { useState, createContext } from "react"

/*
    The context is imported and used by individual components
    that need data
*/
export const GroupUserContext = createContext()

/*
 This component establishes what data can be used.
 */
export const GroupUsersProvider = (props) => {
    const [groupUsers, setGroupUsers] = useState([])

    const getGroupUsers = () => {
        return fetch("http://localhost:8088/groupUsers?_expand=user&_expand=group")
            .then(res => res.json())
            .then(setGroupUsers)
    }

    /*
        You return a context provider which has the
        `locations` state, the `addLocation` function,
        and the `getLocation` function as keys. This
        allows any child elements to access them.
    */
    return (
        <GroupUserContext.Provider value={{
            groupUsers, getGroupUsers
        }}>
            {props.children}
        </GroupUserContext.Provider>
    )
}