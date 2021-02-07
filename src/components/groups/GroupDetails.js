import React, { useContext, useEffect, useState } from "react"
import { Button, Col, Container, Row, Dropdown } from "react-bootstrap"
import { Link, useParams } from "react-router-dom"
import "../scss/_group.scss"
import { deleteGroup, getGroups, GetOneGroup } from "../../modules/APICalls"

export const GroupDetails = () => {

    const [group, setGroup] = useState({})
    const { groupId } = useParams()

    useEffect(() => {
        getGroups(groupId)
            .then(response => {
                const result = Object.keys(response)
                console.log(result)
                GetOneGroup(groupId)
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
                    <Dropdown>
                        <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                            Group Options
                    </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item href={`/group/details/${groupId}/add`}>
                                Add User
                            </Dropdown.Item>
                            <Dropdown.Item onClick={deleteGroup(`${group.fbid}`)}>
                                    Delete Group
                            </Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
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

