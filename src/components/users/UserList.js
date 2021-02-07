import React, { useEffect, useState } from "react"
import { Container } from "react-bootstrap"
import { getUsers } from "../../modules/APICalls"
import { UserCard } from './UserCard'


export const UserList = () => {

  const [userArray, setUserArray ] = useState([])
  const [ searchTerms, setSearchTerms ] = useState("")
  const [filteredUsers, setFiltered] = useState([])
  
  const getAllUsers = () => {
        
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
  
  useEffect(() => {
    if (searchTerms !== "") {
      const subset = userArray.filter(users => users.displayName.toLowerCase().includes(searchTerms))
      setFiltered(subset)
    } else {
      setFiltered(userArray)
    }
  }, [searchTerms, userArray])

  return (
    <Container >
      {
        userArray.map(user => {
          return (
          <UserCard key={user.id} user={user} />
          )
        })
      }
    </Container>
  )
}