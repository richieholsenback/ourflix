import React, { useEffect, useState } from "react"
import { Col, Container, Row } from "react-bootstrap"
import { getFriends, getUsers } from "../../modules/APICalls"
import { FriendCard } from "./FriendCard"
import firebase from "firebase/app";

export const FriendList = () => {

    const [friendArray, setFriendArray] = useState([])

    const userId = firebase.auth().currentUser.uid

    const getAllFriends = () => {
        getFriends(userId)
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
        getAllFriends()
    }, [])


    return (
        
        <Container className="friends">
            {console.log(friendArray)}
            <Row>
                <Col>
                    <h2>Your Friends X</h2>
                    <div className="followingList">
                        {
                            friendArray.map(friend => {
                                return <FriendCard key={friend.uid} friend={friend} />
                            })
                        }
                    </div>
                </Col>
            </Row>
        </Container>
    )
}