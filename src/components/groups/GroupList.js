import React, { useEffect, useState } from "react"
import { Col, Container, Row } from "react-bootstrap"
import { getGroupUsers } from "../../modules/APICalls"
import { GroupUserCard } from "./GroupCard"

export const GroupUserList = () => {

    const [groupUserArray, setGroupUserArray] = useState([])

    // const [lastSwipeDirection, setLastSwipeDirection] = React.useState(null);

    const getAllGroupUsers = () => {
        getGroupUsers()
            .then(data => {
                console.log("fb data", data)
                let arrayWithFBID = Object.keys(data).map((key, index) => {
                    data[key].fbid = key;
                    return data[key];
                })

                console.log("arrayWithFBID", arrayWithFBID);
                //and sort with most recent date first
                arrayWithFBID.sort((a, b) => (a.timestamp < b.timestamp) ? 1 : -1)
                setGroupUserArray(arrayWithFBID)
            })
    }

    useEffect(() => {
        console.log("hello")		
        getAllGroupUsers()
	}, [])

    return (
        <Container className="groupUsers">
            <Row>
                <Col>
                    <h2>Your Groups</h2>
                    <div className="followingList">
                        {
                            groupUserArray.map(groupUser => {
                                return <GroupUserCard key={groupUser.id} groupUser={groupUser} user={groupUser.user} group={groupUser.group} />
                            })
                        }
                    </div>
                </Col>
            </Row>
        </Container>
    )
}