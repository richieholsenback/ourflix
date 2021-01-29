import React from "react"
import { Image } from "react-bootstrap"
import { Link } from "react-router-dom"
import "../scss/_user.scss"

export const GroupUserCard = ({ groupUser, user, group }) => {
    return (
        <div className="user-card">
            <Link to={`/groups/detail/${group.id}`}>
                <h2>{group.name}</h2>
            </Link>
        </div>
    )
}