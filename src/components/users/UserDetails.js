import React, { useEffect, useState } from "react"
import { Col, Container, Image, Row } from "react-bootstrap"
import { Link, useHistory, useParams } from "react-router-dom"
import { GetOneUser, getOneUserAlt, getMovieLikes } from "../../modules/APICalls"
import { MediaCard } from "../Media/card/Card"
import "../scss/_user.scss"



export const UserDetails = () => {

    const [user, setUser] = useState({})
    const [movieLikes, setMovieLikes] = useState([])
    const { fbid } = useParams();

    const userId = sessionStorage.getItem("active_user").uid

    useEffect(() => {
        GetOneUser(fbid)
            .then(response => {
                setUser(response)
            })
    }, [])

    const getAllMovieLikes = () => {
        console.log(userId)
        getMovieLikes(userId)
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
                setMovieLikes(arrayWithFBID)
            })
            })
    }

    useEffect(() => {
        getAllMovieLikes()
        console.log(movieLikes)
    }, [])

    return (
        <Container id="user-card">
            <Row>
                <Col>
                    <Image src={user.photoURL} />
                    <h2>{user.displayName}'s profile</h2>
                </Col>
            </Row>
            <Row>
                <Col>
                    <h5>Movies</h5>
                    {
                        movieLikes.map(like =>{
                            return <MediaCard key={like.fbid} item={like} />
                            })
                    }
                    <h5>Shows</h5>
                </Col>
            </Row>
        </Container>
    )
}