import React, { useEffect, useState } from "react"
import { Col, Container, Image, Row } from "react-bootstrap"
import { BiStar } from "react-icons/bi";
import "../../scss/card.scss"
import { Link, useParams } from "react-router-dom";
import { GetOneShow } from "../../../modules/APICalls";
import { FaPlay } from "react-icons/fa";

// const [lastSwipeDirection, setLastSwipeDirection] = React.useState(null);
export const ShowDetails = () => {

    const [show, setShow] = useState({})
    const { fbid } = useParams();

    useEffect(() => {
        GetOneShow(fbid)
            .then(response => {
                setShow(response)
            })
    }, [fbid])

    return (
        <Container >
            <Row>
                <Col id="filter">
                    <Link to="/shows">
                        <h3>Back</h3>
                    </Link>
                </Col>
            </Row>
            <div id="card-container">
                <Row>
                    <Col className="card-image">
                        <Image id="media-img-detail" src={show.image} alt="movie or show poster" rounded />
                        <div id="media-descrip">
                            <h2>{show.title}</h2>
                            <p>{show.released}</p>
                            <p><BiStar />{show.rating}/10</p>
                            <p>{show.runtime}</p>
                            <p>{show.synopsis}</p>
                        </div>
                        <a id="imdb-preview" href={"https://www.imdb.com/title/" + show.imdbid} target="_blank" rel="noreferrer">
                            <button id="yellow-fill-button">IMDb</button>
                        </a>
                        <a id="preview" href={"https://www.netflix.com/title/" + show.netflixid} target="_blank" rel="noreferrer">
                            <button id="white-fill-button"><FaPlay size="0.8em"/> Preview</button>
                        </a>
                    </Col>
                </Row>
            </div>
        </Container>
    )
}