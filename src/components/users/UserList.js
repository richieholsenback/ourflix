import React, { useEffect, useState } from "react"
import { Col, Container, Row } from "react-bootstrap"
import { getUsers } from "../../modules/APICalls"
import { UserCard } from './UserCard'
import "../scss/user.scss"


export const UserList = () => {

  const [userArray, setUserArray ] = useState([])
  const [ searchTerms] = useState("")
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
    <Container id="user-card">
      <Row>
        <Col>
      <h2>Other Users</h2>
        </Col>
      </Row>
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