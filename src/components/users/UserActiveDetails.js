import React, { useEffect, useState } from "react"
import { Col, Container, Image, Row } from "react-bootstrap"
import { Link, useHistory, useParams } from "react-router-dom"
import { getMovieLikes, GetOneUser, getOneUserAlt, getShowLikes } from "../../modules/APICalls"
import { MediaCard } from "../Media/card/Card"
import firebase from "firebase/app";
import "../scss/user.scss"

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

    const getAllMovieLikes = () => {
        getMovieLikes(userId)
            .then(data => {
                data.map(movieObject => {
                    let arrayWithFBID = Object.keys(movieObject).map((key, index) => {
                        movieObject[key].fbid = key;
                        return movieObject[key];

                    })
                    //and sort with most recent date first
                    arrayWithFBID.sort((a, b) => (a.timestamp < b.timestamp) ? 1 : -1)
                    setMovieLikes(arrayWithFBID)
                })
            })
    }

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
        getAllMovieLikes()
    }, [])

    useEffect(() => {
        getAllShowLikes()
    }, [])

    const editProfile = () => {
        return (
            <Col>
            <Link to={`/user/update/${uid}`} >Edit Profile</Link>
            </Col>
        )
    }

    return (
        <Container id="user-card">
            <Row>
                <Col>
                    <Image src={user.photoURL} />
                    <h2>{user.displayName}'s profile</h2>
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
                                <MediaCard key={like.fbid} item={like} />
                            </Col>
                        )
                    })
                }
            </Row>
        </Container>
    )
}







   