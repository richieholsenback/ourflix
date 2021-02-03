import React, { useContext, useEffect, useState } from "react"
import { FriendContext } from "../friends/FriendProvider"
import { UserCard } from './UserCard'
import { UserContext } from './UserProvider'


export const UserList = () => {
  // This state changes when `getAnimals()` is invoked below
  const { users, getUsers, searchTerms } = useContext(UserContext)
  const { friends, getFriends } = useContext(FriendContext)

  const [filteredUsers, setFiltered] = useState([])
  

  //useEffect - reach out to the world for something
  useEffect(() => {
    getUsers().then(
      getFriends()
    )
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

  const findIfFollowing = (obj) => {
    const hasFollowers = friends.find(friend => friend.userId === obj.id)
    if (!hasFollowers && obj.id !== parseInt(sessionStorage.getItem("active_user"))) {
      return <UserCard key={obj.id} user={obj} />
    }
  }

  return (
    <div className="users">
      {/* {console.log("UserList: Render")} */}
      {
        filteredUsers.map(user => {
          return findIfFollowing(user)
        })
      }
    </div>
  )
}