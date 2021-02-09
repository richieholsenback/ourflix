import React, { useEffect, useState } from "react"
import { Col, Container, Image, Row } from "react-bootstrap"
import { Link, useParams } from "react-router-dom"
import { GetOneUser, getShowLikes, getMovieLikes, getOneUserAlt } from "../../modules/APICalls"
import { MediaCard } from "../Media/card/Card"
import { LikedShows } from "../Media/shows/LikedShows"
import "../scss/user.scss"
import firebase from "firebase/app";


export const UserDetails = () => {

    const [user, setUser] = useState({})
    const [movieLikes, setMovieLikes] = useState([])
    const [showLikes, setShowLikes] = useState([])
    const { uid } = useParams();

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
        getMovieLikes(uid)
            .then(data => {
                console.log("fb data", data)
                data.map(movieObject => {
                    let arrayWithFBID = Object.keys(movieObject).map((key, index) => {
                        movieObject[key].fbid = key;
                        return movieObject[key];

                    })
                    //and sort with most recent date first
                    console.log("arrayWithshow", arrayWithFBID);
                    arrayWithFBID.sort((a, b) => (a.timestamp < b.timestamp) ? 1 : -1)
                    setMovieLikes(arrayWithFBID)
                })
            })
    }

    const getAllShowLikes = () => {
        getShowLikes(uid)
            .then(data => {
                console.log("fb show data", data)
                data.map(showObject => {
                    let arrayWithFBID = Object.keys(showObject).map((key, index) => {
                        showObject[key].fbid = key;
                        return showObject[key];

                    })
                    console.log("arrayWithshow", arrayWithFBID);
                    //and sort with most recent date first
                    arrayWithFBID.sort((a, b) => (a.timestamp < b.timestamp) ? 1 : -1)
                    setShowLikes(arrayWithFBID)
                })
            })
    }

    useEffect(() => {
        getAllMovieLikes()
        console.log(movieLikes)
    }, [])

    useEffect(() => {
        getAllShowLikes()
        console.log(movieLikes)
    }, [])

    const profileOptions = (userObj) => {
        if (uid === userObj.uid){
            return (
                <Link to={`/user/update/${uid}`} >Edit Profile</Link>
            )
        } else {
            return null
        }
    }

    return (
        <Container id="user-card">
            <Row>
                <Col>
                    <Image src={user.photoURL} />
                    <h2>{user.displayName}'s profile</h2>
                </Col>
                {profileOptions(`${user.uid}`)}
            </Row>
            <Row>
                <Col>
                    <h5>Movies</h5>
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
                    <h5>Shows</h5>
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