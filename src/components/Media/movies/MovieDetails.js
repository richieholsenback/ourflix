import React, { useEffect, useState } from "react"
import { Col, Container, Image, Row } from "react-bootstrap"
import { BiStar } from "react-icons/bi";
import "../../scss/card.scss"
import { Link, useParams } from "react-router-dom";
import { GetOneMovie } from "../../../modules/APICalls";
import { FaPlay } from "react-icons/fa";
// import poster from "../../../images/New_Girl.jpg"

export const MovieDetails = () => {

    const [movie, setMovie] = useState({})
    const { fbid } = useParams();

    useEffect(() => {
        GetOneMovie(fbid)
            .then(response => {
                setMovie(response)
            })
    }, [fbid])

    return (
        <Container id="card-container">
            <Row>
                <Col id="filter">
                    <Link to="/">
                        <h3>Back</h3>
                    </Link>
                </Col>
            </Row>
            <Row className="card-image">
                <Col>
                    <Image id="media-img-detail" src={movie.image} alt="movie or show poster" rounded />
                    <div id="media-descrip">
                        <h2>{movie.title}</h2>
                        <p>{movie.released}</p>
                        <p><BiStar />{movie.rating}/10</p>
                        <p>{movie.runtime}</p>
                        <p>{movie.synopsis}</p>
                    </div>
                    <a id="imdb-preview" href={"https://www.imdb.com/title/" + movie.imdbid} target="_blank" rel="noreferrer">
                            <button id="yellow-fill-button">IMDb</button>
                        </a>
                        <a id="preview" href={"https://www.netflix.com/title/" + movie.netflixid} target="_blank" rel="noreferrer">
                            <button id="white-fill-button"><FaPlay size="0.8em"/> Preview</button>
                        </a>
                </Col>
            </Row>
            {/* <Row className="card-options">
                <Col xs={4}><IoCloseCircleOutline color="white" size="5em" /></Col>
                <Link to={`/movies`}>
                    <Col xs={4} id="card-detail-button">
                        <h2 id="card-detail-button-text">Back</h2>
                        <FiChevronDown color="white" size="3em" />
                    </Col>
                </Link>
                <Col xs={4}><IoCheckmarkCircleOutline color="white" size="5em" /></Col>
            </Row> */}
        </Container>
    )
}