import React from "react"
import { Col, Container, Image, Row } from "react-bootstrap"
import { IoCloseCircleOutline, IoCheckmarkCircleOutline } from "react-icons/io5"
import { FiChevronDown } from "react-icons/fi"
import "../../scss/_card.scss"

export const MediaCard = ({ item }) => {
    return (
        <Container id="card-container">
            <Row className="card-image">
                <Col>
                    <Image id="media-img" src={item.image} alt="movie or show poster" rounded />
                </Col>
            </Row>
            <Row className="card-options">
                <Col>
                    <button id="outline-button">Not Interested</button>
                </Col>
                <Col id="card-detail-button">
                    <h2 id="card-detail-button-text">Details</h2>
                    <FiChevronDown color="white" />
                </Col>
                <Col>
                    <button id="outline-button">Interested</button>
                </Col>
            </Row>
        </Container>
    )
}