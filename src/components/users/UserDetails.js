import React, { useEffect, useState } from "react"
import { Col, Container, Image, Row } from "react-bootstrap"
import { Link, useHistory, useParams } from "react-router-dom"
import { GetOneUser, getOneUserAlt } from "../../modules/APICalls"
import "../scss/_user.scss"



export const UserDetails = () => {

    const [user, setUser] = useState({})
    const { fbid } = useParams();

    const userId = sessionStorage.getItem("active_user").fbid

    useEffect(() => {
        GetOneUser(fbid)
            .then(response => {
                setUser(response)
            })
    }, [])

    return (
        <Container id="user-card">
            <Row>
                <Col>
                    <Image src={user.photoURL} />
                    <h2>{user.displayName}'s profile</h2>
                </Col>
            </Row>
            <Row>
                <Col>
                    <h5>Movies</h5>
                    <h5>Shows</h5>
                </Col>
            </Row>
        </Container>
    )
}