import React from "react"
import { Image } from "react-bootstrap"
import { Link } from "react-router-dom"
import "../scss/_friend.scss"

export const FriendCard = ({ friend }) => {
    return (
        <Link to={`friend/details/${friend.fbid}`}>
            <div className="friend-card">
                <Image src={friend.photoURL} alt="friend pic" id="friend-pic" />
                <h2>{friend.displayName}</h2>
            </div>
        </Link>
    )
}