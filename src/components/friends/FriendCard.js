import React from "react"
import { Image } from "react-bootstrap"
import { Link } from "react-router-dom"
import "../scss/_user.scss"

export const FriendCard = ({friend, user}) => {
    return (
        <Link to={`friends/detail/${user.id}`} className="user-card">
            <Image src={user.avatar} alt="friend pic" id="user-pic"/>
            <h2>{user.firstName} {user.lastName}</h2>
        </Link>
    )
}