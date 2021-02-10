import React, { useEffect, useState } from "react"
import { Button, Col, Container, Image, Row } from "react-bootstrap"
import { Link, useHistory, useParams } from "react-router-dom"
import { getMovieLikes, GetOneUser, getOneUserAlt, getShowLikes } from "../../modules/APICalls"
import { MediaCard } from "../Media/card/Card"
import firebase from "firebase/app";
import "../scss/user.scss"
import { ShowCard } from "../Media/card/ShowCardUser"

export const UserActiveDetails = () => {

    const [user, setUser] = useState({})
    const { uid } = useParams();
    const [movieLikes, setMovieLikes] = useState([])
    const [showLikes, setShowLikes] = useState([])
    const { fbid } = useParams();

    const userId = firebase.auth().currentUser.uid

    useEffect(() => {
        getOneUserAlt(uid)
            .then(response => {
                const result = Object.keys(response)
                GetOneUser(result)
                    .then(response => {
                        setUser(response)
                    })
            })
    }, [])



    useEffect(() => {
        getMovieLikes(uid)
        .then(results => setMovieLikes(results))
    }, [])

    useEffect(() => {
        getShowLikes(uid)
        .then(results => setShowLikes(results))
    }, [])

    const editProfile = () => {
        return (
            <Col>
            <Link to={`/user/update/${uid}`} >
                <Button variant="danger">
                Edit Account
                </Button>
                </Link>
            </Col>
        )
    }

    return (
        <Container id="user-card">
            <Row>
                <Col>
                    <h2>Your Profile, {user.displayName}</h2>
                    {editProfile()}
                </Col>
            </Row>
            <Row>
                <Col>
                    <h4>Movies</h4>
                </Col>
            </Row>
            <Row>

                {
                    movieLikes.map(like => {
                        return (
                            <Col xs={4}>
                                <MediaCard key={like.fbid} item={like} />
                            </Col>
                        )
                    })
                }
            </Row>
            <Row>
                <Col>
                    <h4>Shows</h4>
                </Col>
            </Row>
            <Row>

                {
                    showLikes.map(like => {
                        return (
                            <Col xs={4}>
                                <ShowCard key={like.fbid} item={like} />
                            </Col>
                        )
                    })
                }
            </Row>
        </Container>
    )
}







   