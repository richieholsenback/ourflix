import React from "react"
import { Image } from "react-bootstrap"
import { Link } from "react-router-dom"
import "../scss/_user.scss"

export const UserCard = ({user}) => {
    
    return (
        <Link to={`users/details/${user.value.uid}`} className="user-card">
            <Image src={user.value.photoURL} alt="user pic" id="user-pic"/>
            <h2>{user.value.displayName}</h2>
        </Link>
    )
}