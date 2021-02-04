import React from "react"
import { Col, Container, Image, Row } from "react-bootstrap"
import "../scss/_user.scss"

export const UserDetails = ({ user }) => {
    return (
        <Container className="user-card">
            <Row>
                <Col>
                    <Image src={user.photoURL} alt="user pic" id="user-pic" />
                </Col>
                <Col>
                    <button id="white-fill-button">Add Friend</button>
                </Col>
            </Row>
            <Col>
                <h2>{user.displayName}</h2>
            </Col>
        </Container>
    )
}