import React from "react"
import { Col, Container, Image, Row } from "react-bootstrap"
import { IoCloseCircleOutline, IoCheckmarkCircleOutline } from "react-icons/io5"
import { FiChevronDown } from "react-icons/fi"
import "../../scss/_card.scss"
import { Link } from "react-router-dom"

export const MediaCard = ({ item }) => {
    return (
        <Container id="card-container">
            <Row className="card-image">
                <Col>
                    <Image id="media-img" src={item.image} alt="movie or show poster" loading="lazy" rounded />
                </Col>
            </Row>
            <Row className="card-options">
                <Col xs={4}><IoCloseCircleOutline color="white" size="6em" /></Col>
                <Col xs={4} >
                    <Link to={`movies/details/${item.nfid}`} id="card-detail-button">
                        <h2 id="card-detail-button-text">Details</h2>
                        <FiChevronDown color="white" size="3em" />
                    </Link>
                </Col>
                <Col xs={4}>
                    <IoCheckmarkCircleOutline color="white" size="6em" />
                </Col>
            </Row>
        </Container>
    )
}