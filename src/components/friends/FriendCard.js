import React from "react"
import { Image } from "react-bootstrap"
import { Link } from "react-router-dom"
import "../scss/_friend.scss"

export const FriendCard = ({ friend, user }) => {
    return (
        <Link to={`friends/detail/${user.id}`}>
            <div className="friend-card">
                <Image src={user.photoURL} alt="friend pic" id="friend-pic" />
                <h2>{user.firstName} {user.lastName}</h2>
            </div>
        </Link>
    )
}