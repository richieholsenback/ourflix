import React, { useContext, useEffect, useState } from "react"
import { Button, Col, Container, Row, Dropdown } from "react-bootstrap"
import { Link, useParams } from "react-router-dom"
import "../scss/group.scss"
import { deleteGroup, getGroups, GetOneGroup } from "../../modules/APICalls"

export const GroupDetails = () => {

    const [group, setGroup] = useState({})
    const { groupId } = useParams()

    const getAllGroups = () => {
        GetOneGroup(groupId)
            .then(data => {
                data.map(friendObject => {
                let arrayWithFBID = Object.keys(friendObject).map((key, index) => {
                    friendObject[key].fbid = key;
                    return friendObject[key];
                    
                })
                //and sort with most recent date first
                arrayWithFBID.sort((a, b) => (a.timestamp < b.timestamp) ? 1 : -1)
                setGroup(arrayWithFBID)
            })
            })
    }

    useEffect(() => {
        GetOneGroup(groupId)
        .then(response => setGroup(response))
    }, [])



    return (
        <Container id="groups">
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
                    <h4>Movies</h4>
                </Col>
            </Row>
            <Row>
                <Col>
                    <h4>TV Shows</h4>
                </Col>
            </Row>
        </Container>
    )
}

