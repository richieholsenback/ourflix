import React, { useContext, useEffect, useState } from "react"
import { Button, Col, Container, Row } from "react-bootstrap"
import { Link, useParams } from "react-router-dom"
import "../scss/_group.scss"
import { getGroups, GetOneGroup } from "../../modules/APICalls"

export const GroupDetails = () => {

    const [group, setGroup] = useState({})
    const { groupId } = useParams()

    useEffect(() => {
        getGroups(groupId)
            .then(response => {
                const result = Object.keys(response)
                GetOneGroup(result)
                    .then(response => {
                        setGroup(response)
                    })
            })
    }, [])

    return (
        <Container id="group-page">
            <Row>
                <Col>
                    <h2>The {group.name} should watch</h2>
                </Col>
                <Col>
                    <Link to={`/group/details/${groupId}/add`}>Add User</Link>
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

