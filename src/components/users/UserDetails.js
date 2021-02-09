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


    

    useEffect(() => {
        getMovieLikes(uid)
        .then(results => setMovieLikes(results))
    }, [])

    useEffect(() => {
        getShowLikes(uid)
        .then(results => setShowLikes(results))
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
                {profileOptions(`${user}`)}
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