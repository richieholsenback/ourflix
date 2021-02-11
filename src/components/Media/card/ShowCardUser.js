import React from "react"
import { Image } from "react-bootstrap"
import { Link } from "react-router-dom"
import "../../scss/card.scss"

export const ShowCard = ({ item }) => {
    return (
        <Link to={`/media/showdetails/${item.netflixid}`} className="card-container-friend">
            <div className="media-image">
                <Image id="media-img" src={item.image} alt="movie or show poster" loading="lazy" rounded />
            </div>
            {/* <div className="media-title-container">
                <h4 className="media-title">{item.title}</h4>
            </div> */}
        </Link >
    )
}