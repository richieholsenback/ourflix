import React, { useEffect, useState } from "react"
import { Button, Col } from "react-bootstrap"
import { Link, useHistory, useParams } from "react-router-dom"
import { getMovieLikes, GetOneUser, getOneUserAlt, getShowLikes } from "../../modules/APICalls"
import { MediaCard } from "../Media/card/Card"
import firebase from "firebase/app";
import "../scss/friend.scss"
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
        <div id="friend-card">
            <div className="left-align">
                <div>
                    <h2>Your Profile</h2>
                    {editProfile()}
                </div>
            </div>
            <div>
                <div className="left-align-extra">
                    <h3>Movies</h3>
                </div>
            </div>
            <div className="movie-row ">
                <div className="movie-column center">

                    {
                        movieLikes.map(like => {
                            return (
                                <MediaCard key={like.fbid} item={like} />

                            )
                        })
                    }
                </div>
            </div>
            <div>
                <div className="left-align-extra">
                    <h3>Shows</h3>
                </div>
            </div>
            <div className="movie-row">
                <div className="movie-column center">

                    {
                        showLikes.map(like => {
                            return (

                                <ShowCard key={like.fbid} item={like} />

                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}







