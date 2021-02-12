import React, { useEffect, useMemo, useState } from "react"
import { Col, Row, Container, Image, Button } from "react-bootstrap"
import { addMovieLike, getMovieLikes, getMovies, getDislikesByUser, addMovieDislike } from "../../../modules/APICalls"
import "../../scss/_list.scss"
import "../../scss/_advanced.scss"
import TinderCard from "react-tinder-card";
import { Link, useHistory } from "react-router-dom"
import { IoCheckmarkCircleOutline, IoCloseCircleOutline } from "react-icons/io5"
import { FiChevronDown } from "react-icons/fi"
import firebase from "firebase/app";

export const MovieList = () => {

    const [movieArray, setMovieArray] = useState([])
    const [movieLikes, setMovieLikes] = useState([])
    const [dislikes, setDislikes] = useState([])

    const userId = firebase.auth().currentUser.uid

    // const [lastSwipeDirection, setLastSwipeDirection] = React.useState(null);

    const getAllMovies = () => {

        getMovies()
            .then(data => {
                let arrayWithFBID = Object.keys(data).map((key, index) => {
                    data[key].fbid = key;
                    return data[key];
                })
                //and sort with most recent date first
                arrayWithFBID.sort((a, b) => (a.timestamp < b.timestamp) ? 1 : -1)
                setMovieArray(arrayWithFBID)
            })
    }

    useEffect(() => {
        getAllMovies()
    }, [])

    useEffect(() => {
        getMovieLikes(userId)
            .then(results => setMovieLikes(results))
    }, [])

    useEffect(() => {
        getDislikesByUser(userId)
            .then(results => setDislikes(results))
    }, [])

    const alreadyRemoved = []
    let MovieState = movieArray

    const [movies, setMovies] = useState(movieArray)
    const history = useHistory();

    const childRefs = useMemo(() => Array(movieArray.length).fill(0).map(i => React.createRef()), [])

    const swiped = (direction, idOfShow) => {

        if (direction === "right") {
            addMovieLike({
                showId: idOfShow,
                userId: firebase.auth().currentUser.uid
            })
        } else if (direction === "left") {
            addMovieDislike({
                showId: idOfShow,
                userId: firebase.auth().currentUser.uid
            })
        }
    }


    const outOfFrame = (title) => {
        MovieState = MovieState.filter(movie => movie.title !== title)
        setMovies(MovieState)
    }

    // const swipe = (dir) => {
    //     const cardsLeft = movies.filter(movie => !alreadyRemoved.includes(movie.title))
    //     if (cardsLeft.length) {
    //         const toBeRemoved = cardsLeft[cardsLeft.length - 1].title // Find the card object to be removed
    //         const index = movieArray.map(movie => movie.title).indexOf(toBeRemoved) // Find the index of which to make the reference to
    //         childRefs[index].current.swipe(dir) // Swipe the card!
    //     }
    // }

    const swipe = (dir) => {
        const cardsLeft = movies.filter(movie => !alreadyRemoved.includes(movie.title))
        if (cardsLeft.length) {
          const toBeRemoved = cardsLeft[cardsLeft.length - 1].name // Find the card object to be removed
          const index = movieArray.map(movie => movie.title).indexOf(toBeRemoved) // Find the index of which to make the reference to
          alreadyRemoved.push(toBeRemoved) // Make sure the next card gets removed next time if this card do not have time to exit the screen
          childRefs[index].current.swipe(dir) // Swipe the card!
        }
      }

    const [like, setLike] = useState({});

    // const handleAddLike = (item) => {
    //     const newLikeObj = { ...like };
    //     newLikeObj.userId = firebase.auth().currentUser.uid;
    //     newLikeObj.showId = item.netflixid;
    //     addMovieLike(newLikeObj)
    //         .then(response => history.push("/"))
    // }

    // const handleAddDislike = (item) => {
    //     const newDislikeObj = { ...like };
    //     newDislikeObj.userId = firebase.auth().currentUser.uid;
    //     newDislikeObj.showId = item.netflixid;
    //     addMovieDislike(newDislikeObj)
    //         .then(response => history.push("/"))
    // }

    const whatToShow = (item) => {
        const hasLiked = movieLikes.find((movie) => movie.netflixid === item.netflixid)
        const hasDisliked = dislikes.find((dislike) => dislike.netflixid === item.netflixid)

        if (!hasLiked && !hasDisliked) {
            return (
                <Container className="card-image">
                    <Row >
                        <Col xs={6}>
                            <Image id="media-img" src={item.image} alt="movie or show poster" rounded />
                        </Col>
                    </Row>
                    <div id="card-options">
                        <div>
                            <Link to={`/movie/details/${item.fbid}`} id="card-detail-button">
                                <h6 id="card-detail-button-text">Details</h6>
                                <FiChevronDown color="white" size="3em" />
                            </Link>
                        </div>
                    </div>
                </Container>
            )
        } else {
            return null
        }
    }

    return (
        <Container>
            <Row>
                <Col id="card-container">
                    {
                        movieArray.map((item, index) => {
                            return (
                                <TinderCard key={item.fbid} ref={childRefs[index]} onCardLeftScreen={() => outOfFrame(item.title)} className='swipe' onSwipe={(dir) => swiped(dir, item.netflixid)}>
                                    {whatToShow(item)}
                                </TinderCard>
                            )
                        })
                    }
                </Col>
            </Row>
            <Row>

            </Row>
        </Container>
    )
}


