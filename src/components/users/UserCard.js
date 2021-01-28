import React from "react"
import { Image } from "react-bootstrap"
import generic from "../../images/userimg.jpg"
import "../scss/_user.scss"

export const UserCard = ({user}) => {
    return (
        <div>
            <Image src={user.avatar} alt="user pic" id="user-pic"/>
            <h2>{user.firstName} {user.lastName}</h2>
        </div>
    )
}