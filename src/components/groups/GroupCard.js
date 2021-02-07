import React from "react"
import { Link } from "react-router-dom"
import "../scss/_user.scss"

export const GroupCard = ({ group }) => {
    return (
        <div className="user-card">
            <Link to={`/group/details/${group.fbid}`}>
                <h2>{group.name}</h2>
            </Link>
        </div>
    )
}