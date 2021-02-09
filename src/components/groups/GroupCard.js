import React from "react"
import { Col, Row, Button } from "react-bootstrap"
import { Link } from "react-router-dom"
import { deleteGroup } from "../../modules/APICalls"
import "../scss/group.scss"

export const GroupCard = ({ group }) => {


    return (
        <Row className="user-card">
            <Col>
                <Link to={`/group/details/${group.fbid}`}>
                    <h3>{group.name}</h3>
                </Link>
            </Col>
        </Row >
    )
}