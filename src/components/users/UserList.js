import React, { useEffect, useState } from "react"
import { Col, Container, Row } from "react-bootstrap"
import { getFriends, getUsers } from "../../modules/APICalls"
import { UserCard } from './UserCard'
import "../scss/user.scss"
import firebase from "firebase/app";


export const UserList = () => {

  const [userArray, setUserArray ] = useState([])
  const [ searchTerms] = useState("")
  const [filteredUsers, setFiltered] = useState([])
  const [friendArray, setFriendArray] = useState([])

  const userIdFB = firebase.auth().currentUser.uid

  const getAllFriends = () => {
      getFriends(userIdFB)
          .then(data => {
              data.map(friendObject => {
              let arrayWithFBID = Object.keys(friendObject).map((key, index) => {
                  friendObject[key].fbid = key;
                  return friendObject[key];
                  
              })
              //and sort with most recent date first
              arrayWithFBID.sort((a, b) => (a.timestamp < b.timestamp) ? 1 : -1)
              setFriendArray(arrayWithFBID)
          })
          })
  }

  useEffect(() => {
      getFriends(userIdFB)
      .then(results => setFriendArray(results))
  }, [])
  
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

  const findIfFriends = (obj) => {
    const hasFriends = friendArray.find(friend => friend.uid === obj.uid)
    if (!hasFriends && obj.uid !== userIdFB) {
      return <UserCard key={obj.id} user={obj} />
    } else {
      return null
    }
  }

  return (
    <Container id="user-card">
      <Row>
        <Col>
      <h2>Other Users</h2>
        </Col>
      </Row>
      {
        userArray.map(user => {
          return findIfFriends(user)
        })
      }
    </Container>
  )
}