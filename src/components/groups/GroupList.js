import React, { useEffect, useState } from "react"
import { Col, Container, Row, Button } from "react-bootstrap"
import { getGroups } from "../../modules/APICalls"
import { GroupCard } from "./GroupCard"
import "../scss/group.scss"
import firebase from "firebase/app";

export const GroupList = () => {

    const [groupArray, setGroupArray] = useState([])

    const userId = firebase.auth().currentUser.uid

    useEffect(() => {
        getGroups(userId)
            .then(results => setGroupArray(results))
    }, [])

    return (
        <Container id="groups">
            <Row>
                <Col >
                    <h2>Your Groups</h2>
                </Col>
                <Col >
                    <Button variant="secondary">New Group</Button>
                </Col>
            </Row>
            <Row>
                <Col>
                    <div className="followingList">
                        {
                            groupArray.map(group => {
                                return <GroupCard key={group.fbid} group={group} />
                            })
                        }
                    </div>
                </Col>
            </Row>
        </Container>
    )
}