import React, { useState } from "react"
import { Image, Button, Row, div } from "react-bootstrap"
import { Link, useHistory } from "react-router-dom"
import { addFriend } from "../../modules/APICalls"
import "../scss/user.scss"
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
            <div id="spacing">
                <div id="align-card-name">
                    <div xs={1}>
                        <Link to={`user/details/${user.fbid}`}>
                            <Image src={user.photoURL} alt="user pic" id="user-pic" />
                        </Link>
                    </div>
                    <div xs={4}>
                        <Link to={`user/details/${user.uid}`}>
                            <h2>{user.displayName}</h2>
                        </Link>
                    </div>
                </div>
                <div >
                    <Button
                        type="submit"
                        onClick={() => {
                            handleAddFriend(user.uid)
                        }}
                    >
                        Add Friend
            </Button>
                </div>
            </div>
        </>
    )
}