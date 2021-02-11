import React from "react"
import { Button, Image } from "react-bootstrap"
import { Link } from "react-router-dom"
import "../../scss/card.scss"

export const MediaCard = ({ item, unlike }) => {
    return (
        <div className="card-container-friend">
            <Link to={`/media/details/${item.netflixid}`} >
                <div className="media-image">
                    <Image id="media-img" src={item.image} alt="movie or show poster" loading="lazy" rounded />
                </div>
            </Link >
            <div>
                {/* <Button onClick={unlike} variant="danger">unlike</Button> */}
                {/* <div className="media-title-container">
                    <h4 className="media-title">{item.title}</h4>
                </div> */}
            </div>
        </div>
    )
}