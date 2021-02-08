import React, { useEffect, useState } from "react"
import { Col, Container, Row } from "react-bootstrap"
import { getGroups } from "../../modules/APICalls"
import { GroupCard } from "./GroupCard"
import "../scss/_group.scss"
import firebase from "firebase/app";

export const GroupList = () => {

    const [groupArray, setGroupArray] = useState([])

    const userId = firebase.auth().currentUser.uid
    
    const getAllGroups = () => {
        console.log(userId)
        getGroups(userId)
            .then(data => {
                console.log("fb data", data)
                data.map(friendObject => {
                let arrayWithFBID = Object.keys(friendObject).map((key, index) => {
                    friendObject[key].fbid = key;
                    return friendObject[key];
                    
                })
                console.log("arrayWithFBID", arrayWithFBID);
                //and sort with most recent date first
                arrayWithFBID.sort((a, b) => (a.timestamp < b.timestamp) ? 1 : -1)
                setGroupArray(arrayWithFBID)
            })
            })
    }

    useEffect(() => {
        getAllGroups()
        console.log(groupArray)
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