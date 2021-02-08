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
            <Row>
                <Col>
                    <h2>{item.title}</h2>
                </Col>
            </Row>
        </Container >
    )
}