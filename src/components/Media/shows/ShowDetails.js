import React, { useEffect, useState } from "react"
import { Col, Container, Image, Row } from "react-bootstrap"
import { IoCloseCircleOutline, IoCheckmarkCircleOutline, IoFilter } from "react-icons/io5"
import { FiChevronDown } from "react-icons/fi"
import { BiStar } from "react-icons/bi";
import "../../scss/_card.scss"
import { Link, useHistory, useParams } from "react-router-dom";
import { GetOneShow } from "../../../modules/APICalls";

    // const [lastSwipeDirection, setLastSwipeDirection] = React.useState(null);
export const ShowDetails = () => {

    const [show, setShow] = useState({})

    const {fbid} = useParams();
    const history = useHistory();

    useEffect(() => {
        GetOneShow(fbid)
        .then(response => {
            setShow(response)
        })
	}, [])

    return (
        <Container id="card-container">
            <Row>
                <Col id="filter">
                    <IoFilter color="white" />
                    <p>Filter</p>
                </Col>
            </Row>
            <Row className="card-image">
                <Col>
                    <Image id="media-img-detail" src={show.image} alt="movie or show poster" rounded />
                    <div id="media-descrip">
                        <h2>{show.title}</h2>
                        <p>{show.released}</p>
                        <p><BiStar />{show.rating}/10</p>
                        <p>{show.runtime}</p>
                        <p>{show.synopsis}</p>
                    </div>
                    <a id="preview" href={"https://www.netflix.com/title/" + show.title} target="_blank" rel="noreferrer">
                        <button id="white-fill-button">Preview</button>
                    </a>
                </Col>
            </Row>
            <Row className="card-options">
                <Col xs={4}><IoCloseCircleOutline color="white" size="5em" /></Col>
                <Link to={`/movies`}>
                    <Col xs={4} id="card-detail-button">
                        <h2 id="card-detail-button-text">Back</h2>
                        <FiChevronDown color="white" size="3em" />
                    </Col>
                </Link>
                <Col xs={4}><IoCheckmarkCircleOutline color="white" size="5em" /></Col>
            </Row>
        </Container>
    )
}