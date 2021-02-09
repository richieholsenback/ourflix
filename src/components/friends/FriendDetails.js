import React, { useEffect, useState } from "react"
import { Col, Container, Image, Row } from "react-bootstrap"
import { Link, useParams } from "react-router-dom"
import { GetOneUser, getShowLikes, getMovieLikes, getOneUserAlt } from "../../modules/APICalls"
import { MediaCard } from "../Media/card/Card"
import { LikedShows } from "../Media/shows/LikedShows"
import "../scss/user.scss"
import firebase from "firebase/app";


export const FriendDetails = () => {

    const [user, setUser] = useState({})
    const [userMovieLikes, setUserMovieLikes] = useState([])
    const [movieLikes, setMovieLikes] = useState([])
    const [userShowLikes, setUserShowLikes] = useState([])
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
        getMovieLikes(userId)
            .then(results => {
                setUserMovieLikes(results)
            })
    }, [])

    useEffect(() => {
        getShowLikes(uid)
            .then(results => setShowLikes(results))
    }, [])

    useEffect(() => {
        getShowLikes(userId)
            .then(results => {
                setUserShowLikes(results)
            })
    }, [])

    const profileOptions = (userObj) => {
        if (uid === userObj.uid) {
            return (
                <Link to={`/user/update/${uid}`} >Edit Profile</Link>
            )
        } else {
            return null
        }
    }

    //Movies in common
    //First, we need to get all of the likes for movies
    //then we need to see what the current user likes
    //then we check if the friend has liked any of those movies

    const findMoviesInCommon = (obj) => {

        const hasInCommon = userMovieLikes.find((movie) => movie.netflixid === obj.netflixid)

        if (hasInCommon) {
            return (
                <MediaCard key={obj.fbid} item={obj} />
            )
        } else {
            return null
        }
    }
    
    const findShowsInCommon = (obj) => {

        const hasInCommon = userShowLikes.find((show) => show.netflixid === obj.netflixid)

        if (hasInCommon) {
            return (
                <MediaCard key={obj.fbid} item={obj} />
            )
        } else {
            return null
        }
    }

    return (
        <Container id="user-card">
            {console.log("movies the user has liked", userMovieLikes)}
            <Row>
                <Col>
                    <Image src={user.photoURL} />
                    <h2>You and {user.displayName} should watch</h2>
                </Col>
                {/* {profileOptions(`${user}`)} */}
            </Row>
            <Row>
                <Col>
                    <h5>Movies</h5>
                </Col>
            </Row>
            <Row>
                <Col xs={4}>
                    {
                        movieLikes.map(like => {
                            console.log("movies the friend has liked", like)
                            return findMoviesInCommon(like)
                        })
                    }
                </Col>
            </Row>
            <Row>
                <Col>
                    <h5>Shows</h5>
                </Col>
            </Row>
            <Row>

                {
                    showLikes.map(like => {
                        console.log("movies the friend has liked", like)
                        return findShowsInCommon(like)
                })
            }
            </Row>
        </Container>
    )
}