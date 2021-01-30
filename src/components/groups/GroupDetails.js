import React, { useContext, useEffect, useState } from "react"
import { Col, Container, Row } from "react-bootstrap"
import { useParams } from "react-router-dom"
import "../scss/_group.scss"
import { GroupContext } from "./GroupProvider"

export const GroupDetails = ({ }) => {
    const { getGroupById } = useContext(GroupContext)

    const [group, setGroup] = useState({})

    const { groupId } = useParams();

    useEffect(() => {
        getGroupById(groupId)
            .then(response => {
                setGroup(response)
            })
    }, [])

    return (
        <Container id="group-page">
            <Row>
                <Col>
                    <h2>The {group.name} should watch</h2>
                </Col>
            </Row>
            <br />
            <Row>
                <Col>
                    <h3>Movies</h3>
                </Col>
            </Row>
            <Row>
                <Col>
                    <h3>TV Shows</h3>
                </Col>
            </Row>
        </Container>
    )
}

