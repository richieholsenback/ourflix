import React, { useEffect, useState } from "react"
import { getUsers, addUser } from "../../modules/APICalls"

export const UserCheck = () => {

    const [userArray, setUserArray] = useState([])

    const activeUser = sessionStorage.getItem("active_user")

    // const [lastSwipeDirection, setLastSwipeDirection] = React.useState(null);

    const getAllUsers = () => {
        console.log("heyyoooo" + activeUser)
        getUsers()
            .then(data => {
                let arrayWithFBID = Object.keys(data).map((key, index) => {
                    data[key].fbid = key;
                    return data[key];
                })
                //and sort with most recent date first
                arrayWithFBID.sort((a, b) => (a.timestamp < b.timestamp) ? 1 : -1)
                setUserArray(arrayWithFBID)
            })
    }

    useEffect(() => {	
        getAllUsers()
    }, [])
    
    const findIfUser = () =>{
    const exists = userArray.find(user => user.uid === activeUser.fbid)
    if (!exists) {
        return addUser(activeUser)
    } else {
        return null
    }
}
return(
    <>
        {findIfUser()}
    </>
)
}
