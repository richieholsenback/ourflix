import React, { useEffect, useState } from "react"
import { Button, Col } from "react-bootstrap"
import { Link, useParams } from "react-router-dom"
import { getMovieLikes, getOneUserAlt, getShowLikes } from "../../modules/APICalls"
import { MediaCard } from "../Media/card/Card"
import firebase from "firebase/app";
import "../scss/friend.scss"
import { ShowCard } from "../Media/card/ShowCardUser"

export const UserActiveDetails = () => {

    const [user, setUser] = useState({})
    const { uid } = useParams();
    const [userArray, setUserArray] = useState([])
    const [movieLikes, setMovieLikes] = useState([])
    const [showLikes, setShowLikes] = useState([])
    const { fbid } = useParams();

    const userId = firebase.auth().currentUser.uid

    const getAllUser = () => {
        getOneUserAlt(uid)
            .then(data => {
                // since our data is returned with a unique key, we need to add it to the object. 
                //use Object.keys
                let arrayWithFBID = Object.keys(data).map((key, index) => {
                    data[key].fbid = key;
                    return data[key];
                });
                //and sort with most recent date first
                console.log(arrayWithFBID)
                arrayWithFBID.sort((a, b) => (a.timestamp < b.timestamp) ? 1 : -1)
                setUser(arrayWithFBID[0])
                console.log(arrayWithFBID[0])
            })
    }

    useEffect(() => {
       getAllUser()
    }, [])



    useEffect(() => {
        getMovieLikes(uid)
            .then(results => setMovieLikes(results))
    }, [])

    useEffect(() => {
        getShowLikes(uid)
            .then(results => setShowLikes(results))
    }, [])

    // const unlikeThisMovie = (fbid) => {
    // 	unlikeMovie(fbid)
    // 		.then(status => {
    // 			if (status === 200){
    // 				getMovieLikes(uid);
    // 			}else {
    // 				console.log("oops, error here")
    // 			}
    // 		})
    // }

    return (
        <div id="friend-card">
            <div className="left-align">
                <div>
                    <h2>Your Profile</h2>
                    <Col>
                <Link to={`/user/update/${user.fbid}`} >
                    <Button variant="danger">
                        Edit Account
                </Button>
                </Link>
            </Col>
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







