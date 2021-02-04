import React, { useContext, useState } from "react"
import { Image, Button } from "react-bootstrap"
import { Link, useHistory } from "react-router-dom"
import { addFriend } from "../../modules/APICalls"
import "../scss/_user.scss"
import firebase from "firebase/app";

export const UserCard = ({user}) => {
    const [ friendItem, setFriendItem ] = useState({})
    
    const history = useHistory()

    const handleAddFriend = (friendId) => {
        
        const newFriendObj = { ...friendItem };
        newFriendObj.friendedById = firebase.auth().currentUser.uid;
        newFriendObj.userId = friendId;
        addFriend(newFriendObj)
          .then(response => history.push("/friends"))
      }
    
    return (
        <Link to={`users/details/${user.uid}`} className="user-card">
            <Image src={user.photoURL} alt="user pic" id="user-pic"/>
            <h2>{user.displayName}</h2>
            <Button
            type="submit"
            onClick={() => {
                handleAddFriend(user.uid)
            }}
            >
                Add Friend
            </Button>
        </Link>
    )
}