import React, { useEffect, useState } from "react"
import { Image } from "react-bootstrap"
import { Link, useParams } from "react-router-dom"
import { GetOneUser, getShowLikes, getMovieLikes, getOneUserAlt } from "../../modules/APICalls"
import { MediaCard } from "../Media/card/Card"
import "../scss/friend.scss"
import firebase from "firebase/app";
import { ShowCard } from "../Media/card/ShowCardUser"


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
        if (uid === userObj.uid) {
            return (
                <Link to={`/user/update/${uid}`} >Edit Profile</Link>
            )
        } else {
            return null
        }
    }

    return (
        <div id="friend-card">
            <div className="left-align">
                <div id="profile-info">
                    <Image src={user.photoURL} />
                    <h2 id="username">{user.displayName}'s profile</h2>
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