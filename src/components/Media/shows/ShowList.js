import React, { useEffect, useMemo, useState } from "react"
import { addShowDislike, addShowLike, getShowDislikesByUser, getShowLikes, getShows } from "../../../modules/APICalls"
import { Button, Col, Container, Image, Row } from "react-bootstrap"
import TinderCard from "react-tinder-card"
import { IoCheckmarkCircleOutline, IoCloseCircleOutline } from "react-icons/io5"
import { Link, useHistory } from "react-router-dom"
import { FiChevronDown } from "react-icons/fi"
import firebase from "firebase/app";

export const ShowList = () => {

    const [showArray, setShowArray] = useState([])
    const [showLikes, setShowLikes] = useState([])
    const [dislikes, setDislikes] = useState([])
    const [like, setLike] = useState({});

    const userId = firebase.auth().currentUser.uid

    const history = useHistory();

    // const [lastSwipeDirection, setLastSwipeDirection] = React.useState(null);

    const getAllShows = () => {

        getShows()
            .then(data => {
                let arrayWithFBID = Object.keys(data).map((key, index) => {
                    data[key].fbid = key;
                    return data[key];
                })
                //and sort with most recent date first
                arrayWithFBID.sort((a, b) => (a.timestamp < b.timestamp) ? 1 : -1)
                setShowArray(arrayWithFBID)
            })
    }

    useEffect(() => {
        getAllShows()
    }, [])

    useEffect(() => {
        getShowLikes(userId)
            .then(results => setShowLikes(results))
    }, [])

    useEffect(() => {
        getShowDislikesByUser(userId)
            .then(results => setDislikes(results))
    }, [])

    const alreadyRemoved = []
    let ShowState = showArray

    const [shows, setShows] = useState(showArray)
    const [lastDirection, setLastDirection] = useState()
    // const history = useHistory();

    const childRefs = useMemo(() => Array(showArray.length).fill(0).map(i => React.createRef()), [])

    const swiped = (direction, idOfShow) => {
        
        const userId = sessionStorage.getItem("active_user").uid
                if (direction === "right") {
                    addShowLike({
                        showId: idOfShow,
                        userId: firebase.auth().currentUser.uid
                    })
                } else if (direction === "left") {
                    addShowDislike({
                        showId: idOfShow,
                        userId: firebase.auth().currentUser.uid
                    })
                }
    }

    const outOfFrame = (title) => {
        ShowState = ShowState.filter(show => show.title !== title)
        setShows(ShowState)
    }

    const swipe = (dir) => {
        const cardsLeft = shows.filter(show => !alreadyRemoved.includes(show.title))
        if (cardsLeft.length) {
            const toBeRemoved = cardsLeft[cardsLeft.length - 1].title // Find the card object to be removed
            const index = showArray.map(show => show.title).indexOf(toBeRemoved) // Find the index of which to make the reference to
            alreadyRemoved.push(toBeRemoved) // Make sure the next card gets removed next time if this card do not have time to exit the screen
            childRefs[index].current.swipe(dir) // Swipe the card!
        }
    }

    const handleAddDisike = (item) => {
        const newDislikeObj = { ...like };
        newDislikeObj.userId = firebase.auth().currentUser.uid;
        newDislikeObj.resultId = item;
        addShowDislike(newDislikeObj)
            .then(response => history.push("/"))
    }

    const whatToShow = (item) => {
        const hasLiked = showLikes.find((show) => show.netflixid === item.netflixid)
        const hasDisliked = dislikes.find((dislike) => dislike.netflixid === item.netflixid)

        if (!hasLiked && !hasDisliked) {
            return (
                <Container className="card-image">
                    <Row >
                        <Col xs={6}>
                            <Image id="media-img" src={item.image} alt="movie or show poster" rounded />
                        </Col>
                    </Row>
                    <Row id="card-options">
                        <div xs={3}>
                            <Button onClick={() => handleAddDisike(`${item.fbid}`, "left")} variant="link">
                                <IoCloseCircleOutline color="white" size="5em" />
                            </Button>
                        </div>
                        <Col xs={3} >
                            <Link to={`/movie/details/${item.fbid}`} id="card-detail-button">
                                <h6 id="card-detail-button-text">Details</h6>
                                <FiChevronDown color="white" size="3em" />
                            </Link>
                        </Col>
                        <div xs={3}>
                            <Button onClick={() => swipe(`${item.fbid}`, "right")} variant="link">
                                <IoCheckmarkCircleOutline color="white" size="5em" />
                            </Button>
                        </div>
                    </Row>
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
                        showArray.map((item, index) => {
                            return (
                                <TinderCard key={item.fbid} ref={childRefs[index]} onCardLeftScreen={() => outOfFrame(item.title)} className='swipe' onSwipe={(dir) => swiped(dir, item.netflixid)}>
                                    {whatToShow(item)}
                                </TinderCard>
                            )
                        })
                    }
                </Col>
            </Row>
        </Container>
    )
}