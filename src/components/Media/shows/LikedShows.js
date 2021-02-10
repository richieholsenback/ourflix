import React, { useEffect, useState } from "react"
import { Col, Container, Image, Row } from "react-bootstrap"
import { getShowLikes} from "../../../modules/APICalls"
import { MediaCard } from "../card/Card"
import "../../scss/user.scss"
import firebase from "firebase/app";


export const LikedShows = () => {

    const [showLikes, setShowLikes] = useState([])

    const userId = firebase.auth().currentUser.uid


    const getAllShowLikes = () => {
        getShowLikes(userId)
            .then(data => {
                data.map(showObject => {
                    let arrayWithFBID = Object.keys(showObject).map((key, index) => {
                        showObject[key].fbid = key;
                        return showObject[key];

                    })
                    //and sort with most recent date first
                    arrayWithFBID.sort((a, b) => (a.timestamp < b.timestamp) ? 1 : -1)
                    setShowLikes(arrayWithFBID)
                })
            })
    }


    useEffect(() => {
        getAllShowLikes()
    }, [])

    return (
        <Row>
            
            {
                showLikes.map(like => {
                    return (
                        <Col xs={4}>
                            <MediaCard key={like.fbid} item={like} />
                        </Col>
                    )
                })
            }
        </Row>
    )
}