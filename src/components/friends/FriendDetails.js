import React, { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { GetOneUser, getShowLikes, getMovieLikes, getOneUserAlt } from "../../modules/APICalls"
import { MediaCard } from "../Media/card/Card"
import "../scss/friend.scss"
import firebase from "firebase/app";
import { ShowCard } from "../Media/card/ShowCardUser"


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
                <ShowCard key={obj.fbid} item={obj} />
            )
        } else {
            return null
        }
    }

    return (
        <div id="friend-card">
            <div>
                <div>
                    {/* <Image src={user.photoURL} /> */}
                    <h2>You and {user.displayName} should watch</h2>
                </div>
                {/* {profileOptions(`${user}`)} */}
            </div>
            <div>
                <div>
                    <h5>Movies</h5>
                </div>
            </div>
            <div className="movie-row">
                <div className="movie-column center">
                    {
                        movieLikes.map(like => {
                            return findMoviesInCommon(like)
                        })
                    }
                </div>
            </div>
            <div>
                <div>
                    <h5>Shows</h5>
                </div>
            </div>
            <div className="movie-row">
                <div className="movie-column center">
                    {
                        showLikes.map(like => {
                            return findShowsInCommon(like)
                        })
                    }
                </div>
            </div>
        </div>
    )
}