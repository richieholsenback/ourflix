import React, { useEffect, useState } from "react"
import { Col, Container, Row } from "react-bootstrap"
import { getFriends, getUsers } from "../../modules/APICalls"
import { FriendCard } from "./FriendCard"

export const FriendList = () => {

    const [friendArray, setFriendArray] = useState([])

    const getAllFriends = () => {
        getFriends()
            .then(data => {
                console.log("fb data", data)
                data.map(friendObject => {
                let arrayWithFBID = Object.keys(friendObject).map((key, index) => {
                    friendObject[key].fbid = key;
                    return friendObject[key];
                    
                })
                console.log("arrayWithFBID", arrayWithFBID);
                //and sort with most recent date first
                arrayWithFBID.sort((a, b) => (a.timestamp < b.timestamp) ? 1 : -1)
                setFriendArray(arrayWithFBID)
            })
            })
    }

    useEffect(() => {
        getAllFriends()
        console.log(friendArray)
    }, [])


    return (
        <Container className="friends">
            <Row>
                <Col>
                    <h2>Your Friends</h2>
                    <div className="followingList">
                        {
                            friendArray.map(friend => {
                                return <FriendCard key={friend.fbid} friend={friend} />
                            })
                        }
                    </div>
                </Col>
            </Row>
        </Container>
    )
}