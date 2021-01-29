import React from "react"
import { Col, Container, Image, Row } from "react-bootstrap"
import { IoCloseCircleOutline, IoCheckmarkCircleOutline, IoFilter } from "react-icons/io5"
import { FiChevronDown } from "react-icons/fi"
import { BiStar } from "react-icons/bi";
import "../../scss/_card.scss"
import poster from "../../../images/New_Girl.jpg"

export const MediaDetails = ({ result }) => {
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
                    <Image id="media-img-detail" src={result.image} alt="movie or show poster" rounded />
                    <div id="media-descrip">
                        <h2>New Girl</h2>
                        <h2>{result.title}</h2>
                        <p>{result.released}</p>
                        <p><BiStar />{result.rating}/10</p>
                        <p>{result.runtime}</p>
                        <p>{result.synopsis}</p>
                    </div>
                    <a id="preview" href={"https://www.netflix.com/title/" + result.title} target="_blank" rel="noreferrer">
                        <button id="white-fill-button">Preview</button>
                    </a>
                </Col>
            </Row>
            <Row className="card-options">
                <Col xs={4}><IoCloseCircleOutline color="white" size="5em" /></Col>
                <Col xs={4} id="card-detail-button">
                    <h2 id="card-detail-button-text">Details</h2>
                    <FiChevronDown color="white" size="3em" />
                </Col>
                <Col xs={4}><IoCheckmarkCircleOutline color="white" size="5em" /></Col>
            </Row>
        </Container>
    )
}