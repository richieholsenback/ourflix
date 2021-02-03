import React, { useContext, useState } from "react"
import { Image, Button } from "react-bootstrap"
import { Link } from "react-router-dom"
import { addFriend } from "../../modules/APICalls"
import "../scss/_user.scss"

export const UserCard = ({user}) => {
    const [ friendItem, setFriendItem ] = useState()
    const userId = parseInt(sessionStorage.getItem("active_user"))

    const addFriendObj = (friendObj) => {
        addFriend({
            userId: friendObj,
            followedById: userId,
            followingId: friendObj,
        })
        // .then(getUsers)	
    }
    
    return (
        <Link to={`users/details/${user.value.uid}`} className="user-card">
            <Image src={user.value.photoURL} alt="user pic" id="user-pic"/>
            <h2>{user.value.displayName}</h2>
            <Button
            type="submit"
            onClick={event => {
                addFriendObj(user.id)
            }}
            >
                Add Friend
            </Button>
        </Link>
    )
}