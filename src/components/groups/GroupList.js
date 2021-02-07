import React, { useEffect, useState } from "react"
import { Col, Container, Row } from "react-bootstrap"
import { getGroups } from "../../modules/APICalls"
import { GroupCard } from "./GroupCard"
import "../scss/_group.scss"

export const GroupList = () => {

    const [groupArray, setGroupArray] = useState([])

    // const [lastSwipeDirection, setLastSwipeDirection] = React.useState(null);

    const getAllGroups = () => {
        getGroups()
            .then(data => {
                let arrayWithFBID = Object.keys(data).map((key, index) => {
                    data[key].fbid = key;
                    return data[key];
                })
                //and sort with most recent date first
                arrayWithFBID.sort((a, b) => (a.timestamp < b.timestamp) ? 1 : -1)
                setGroupArray(arrayWithFBID)
            })
    }

    useEffect(() => {	
        getAllGroups()
	}, [])

    return (
        <Container className="groups">
            <Row>
                <Col>
                    <h2>Your Groups</h2>
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