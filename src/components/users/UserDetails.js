import React from "react"
import { Image } from "react-bootstrap"
import "../scss/_user.scss"

export const UserDetails = ({user}) => {
    return (
        <div className="user-card">
            <Image src={user.avatar} alt="user pic" id="user-pic"/>
            <h2>{user.firstName} {user.lastName}</h2>
            <button id="white-fill-button">Add Friend</button>
        </div>
    )
}