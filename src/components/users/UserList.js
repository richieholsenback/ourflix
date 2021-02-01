import React, { useContext, useEffect, useState } from "react"
import { useHistory } from "react-router-dom"
import { UserCard } from './UserCard'
import { UserContext } from './UserProvider'


export const UserList = () => {
  // This state changes when `getAnimals()` is invoked below
  const { users, getUsers, searchTerms } = useContext(UserContext)

  const [filteredUsers, setFiltered] = useState([])
  const history = useHistory()
  

  //useEffect - reach out to the world for something
  useEffect(() => {
    getUsers()
  }, [])

  useEffect(() => {
    if (searchTerms !== "") {
      // If the search field is not blank, display matching users
      const subset = users.filter(user => user.firstName.toLowerCase().includes(searchTerms))
      setFiltered(subset)
    } else {
      // If the search field is blank, display all users
      setFiltered(users)
    }
  }, [searchTerms, users])

  return (
    <div className="users">
      {/* {console.log("UserList: Render")} */}
      {
        filteredUsers.map(user => {
          return <UserCard key={user.id} user={user} />
        })
      }
    </div>
  )
}