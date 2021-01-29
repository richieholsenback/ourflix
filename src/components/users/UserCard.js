import React from "react"
import { Image } from "react-bootstrap"
import { Link } from "react-router-dom"
import "../scss/_user.scss"

export const UserCard = ({user}) => {
    return (
        <Link to={`users/details/${user.id}`} className="user-card">
            <Image src={user.avatar} alt="user pic" id="user-pic"/>
            <h2>{user.firstName} {user.lastName}</h2>
        </Link>
    )
}