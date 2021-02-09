import React from "react"
import { Image } from "react-bootstrap"
import { Link } from "react-router-dom"
import "../scss/friend.scss"

export const FriendCard = ({ friend }) => {
    return (
        <Link to={`friend/details/${friend.fbid}`}>
            <div className="friend-card">
                <Image src={friend.photoURL} alt="friend pic" id="friend-pic" />
                <h5>{friend.displayName}</h5>
            </div>
        </Link>
    )
}