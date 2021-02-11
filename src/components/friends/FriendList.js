import React, { useEffect, useState } from "react"
import { Col, Container, Row } from "react-bootstrap"
import { getFriends } from "../../modules/APICalls"
import { FriendCard } from "./FriendCard"
import firebase from "firebase/app";
import "../scss/friend.scss"

export const FriendList = () => {

    const [friendArray, setFriendArray] = useState([])

    const userId = firebase.auth().currentUser.uid


    useEffect(() => {
        getFriends(userId)
        .then(results => setFriendArray(results))
    }, [])


    return (
        
        <Container id="friends">
            <Row>
                <Col>
                    <h2>Your Friends</h2>
                    <div className="followingList">
                        {
                            friendArray.map(friend => {
                                return <FriendCard key={friend.apiKey} friend={friend} />
                            })
                        }
                    </div>
                </Col>
            </Row>
        </Container>
    )
}