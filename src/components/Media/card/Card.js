import React from "react"
import { Image } from "react-bootstrap"
import { Link } from "react-router-dom"
import "../../scss/card.scss"

export const MediaCard = ({ item }) => {
    return (
        <Link to={`/media/details/${item.netflixid}`} className="card-container-friend">
            <div className="media-image">
                <Image id="media-img" src={item.image} alt="movie or show poster" loading="lazy" rounded />
            </div>
            <div>
                <div className="media-title-container">
                    <h4 className="media-title">{item.title}</h4>
                </div>
            </div>
        </Link >
    )
}