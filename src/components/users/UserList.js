import React, { useContext, useEffect } from "react"
import {UserCard} from './UserCard'
import {UserContext} from './UserProvider'


export const UserList = () => {
   // This state changes when `getAnimals()` is invoked below
    const { users, getUsers } = useContext(UserContext)
	
	//useEffect - reach out to the world for something
    useEffect(() => {
		console.log("UserList: useEffect - getUsers")
		getUsers()
		
    }, [])


    return (	
		<div className="users">
		    {/* {console.log("UserList: Render")} */}
        {
			users.map(user => {
				return <UserCard key={user.id} user={user} />
			})
        }
        </div>
    )
}