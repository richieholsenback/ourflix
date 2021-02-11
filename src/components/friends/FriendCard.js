import React from "react"
import { Image } from "react-bootstrap"
import { Link } from "react-router-dom"
import "../scss/friend.scss"
import "../scss/user.scss"

export const FriendCard = ({ friend }) => {
    return (
        <Link to={`friend/details/${friend.uid}`}>
            <div className="friend-card">
                <Image src={friend.photoURL} alt="friend pic" id="friend-pic" />
                <h5>{friend.displayName}</h5>
            </div>
        </Link>
    )
}