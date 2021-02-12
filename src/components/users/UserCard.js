import React, { useState } from "react"
import { Image, Button, Row, div } from "react-bootstrap"
import { Link, useHistory } from "react-router-dom"
import { addFriend, getFriends } from "../../modules/APICalls"
import "../scss/user.scss"
import firebase from "firebase/app";
import { AiOutlineUserAdd } from "react-icons/ai";

export const UserCard = ({ user }) => {
    const [friendItem, setFriendItem] = useState({})

    const history = useHistory()

    const handleAddFriend = (friendId) => {

        const newFriendObj = { ...friendItem };
        newFriendObj.friendedById = firebase.auth().currentUser.uid;
        newFriendObj.userId = friendId;
        addFriend(newFriendObj)
            .then(() => refreshPage())
    }

    function refreshPage() {
        window.location.reload(false);
    }

    const profilePic = (item) => {
        if (item.photoURL){
            return <Image src={user.photoURL} alt="user pic" id="user-pic" />
        } else {
            return <Image alt="user pic" id="user-pic" src="https://pro2-bar-s3-cdn-cf1.myportfolio.com/dddb0c1b4ab622854dd81280840458d3/98032aebff601c1d993e12a0_rw_600.png?h=8030f4d5734548795c22da59ca72e3e1" />
        }
    }

    const profileName = (item) => {
        if (item.photoURL){
            return <h5>{user.displayName}</h5>
        } else {
            return <h5>{user.email}</h5>
        }
    }

    return (
        <>
            <div id="spacing">
                {console.log("users", user)}
                <div id="align-card-name">
                    <div xs={1}>
                        <Link to={`user/details/${user.fbid}`}>
                            {profilePic(user)}
                        </Link>
                    </div>
                    <div xs={4}>
                        <Link to={`user/details/${user.uid}`}>
                            {profileName(user)}
                        </Link>
                    </div>
                </div>
                <div >
                    <Button
                        type="submit"
                        variant="danger"
                        onClick={() => {
                            handleAddFriend(user.uid)
                        }}
                    >
                        <AiOutlineUserAdd />
            </Button>
                </div>
            </div>
        </>
    )
}