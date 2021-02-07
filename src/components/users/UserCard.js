import React, { useState } from "react"
import { Image, Button, Row, Col } from "react-bootstrap"
import { Link, useHistory } from "react-router-dom"
import { addFriend } from "../../modules/APICalls"
import "../scss/_user.scss"
import firebase from "firebase/app";

export const UserCard = ({ user }) => {
    const [friendItem, setFriendItem] = useState({})

    const history = useHistory()

    const handleAddFriend = (friendId) => {

        const newFriendObj = { ...friendItem };
        newFriendObj.friendedById = firebase.auth().currentUser.uid;
        newFriendObj.userId = friendId;
        addFriend(newFriendObj)
            .then(response => history.push("/friends"))
    }

    return (
        <>
            <Row>
                <Col xs={1}>
                    <Link to={`user/details/${user.fbid}`}>
                        <Image src={user.photoURL} alt="user pic" id="user-pic" />
                    </Link>
                </Col>
                <Col xs={4}>
                    <Link to={`user/details/${user.fbid}`}>
                        <h2>{user.displayName}</h2>
                    </Link>
                </Col>
                <Col>
                    <Button
                        type="submit"
                        onClick={() => {
                            handleAddFriend(user.uid)
                        }}
                    >
                        Add Friend
            </Button>
                </Col>
            </Row>
        </>
    )
}