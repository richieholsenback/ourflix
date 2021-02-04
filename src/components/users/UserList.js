import React, { useEffect, useState } from "react"
import { Container } from "react-bootstrap"
import { getUsers } from "../../modules/APICalls"
import { UserCard } from './UserCard'


export const UserList = () => {
  // This state changes when `getAnimals()` is invoked below

  const [userArray, setUserArray] = useState([])

    // const [lastSwipeDirection, setLastSwipeDirection] = React.useState(null);

    const getAllUsers = () => {
        
        getUsers()
            .then(data => {
                console.log("fb data", data)
                let arrayWithFBID = Object.keys(data).map((key, index) => {
                    data[key].fbid = key;
                    return data[key];
                })

                console.log("arrayWithFBID", arrayWithFBID);
                //and sort with most recent date first
                arrayWithFBID.sort((a, b) => (a.timestamp < b.timestamp) ? 1 : -1)
                setUserArray(arrayWithFBID)
            })
    }

    useEffect(() => {
        console.log("hello")		
        getAllUsers()
	}, [])

  return (
    <Container className="justify-content-xs-center">
      {/* {console.log("UserList: Render")} */}
      {
        userArray.map(user => {
          return <UserCard key={user.id} user={user} />
        })
      }
    </Container>
  )
}