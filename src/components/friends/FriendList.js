import React, { useContext, useEffect } from "react"
import { Col, Container, Row } from "react-bootstrap"
import { useHistory } from "react-router-dom"
import { FriendCard } from "./FriendCard"
import { FriendContext } from "./FriendProvider"

export const FriendList = () => {

    const { friends, getFriends } = useContext(FriendContext)

    useEffect(() => {
        getFriends()
    }, [])

      const history = useHistory()
      //returns the user's list of friends

      const filteredFriends = friends.filter(friend => friend.friendedId === parseInt(sessionStorage.getItem("active_user")))

    return (
        <Container className="friends">
            <Row>
                <Col>
            <h2>Your Friends</h2>
            <div className="followingList">
                {
                    filteredFriends.map(friend => {
                        return <FriendCard key={friend.id} friend={friend} user={friend.user}/>
                    })
                }
            </div>
            </Col>
            </Row>
        </Container>
    )
}