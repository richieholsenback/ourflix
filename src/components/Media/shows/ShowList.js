import React, { useEffect, useMemo, useState } from "react"
import { MediaCard } from "../card/Card"
import { addDislike, addLike, getShows } from "../../../modules/APICalls"
import { Button, Col, Container, Image, Row } from "react-bootstrap"
import TinderCard from "react-tinder-card"
import { IoCheckmarkCircleOutline, IoCloseCircleOutline } from "react-icons/io5"
import { Link } from "react-router-dom"
import { FiChevronDown } from "react-icons/fi"
import firebase from "firebase/app";

export const ShowList = () => {

    const [showArray, setShowArray] = useState([])
    const [isLoading, setIsLoading] = useState(true);

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

    const alreadyRemoved = []
    let ShowState = showArray

    const [shows, setShows] = useState(showArray)
    const [lastDirection, setLastDirection] = useState()
    // const history = useHistory();

    const childRefs = useMemo(() => Array(showArray.length).fill(0).map(i => React.createRef()), [])

    const swiped = (direction, idOfShow) => {
        
        const userId = sessionStorage.getItem("active_user").uid
                if (direction === "right") {
                    addLike({
                        showId: idOfShow,
                        userId: firebase.auth().currentUser.uid
                    })
                } else if (direction === "left") {
                    addDislike({
                        showId: idOfShow,
                        userId: firebase.auth().currentUser.uid
                    })
                }
    }

    const outOfFrame = (title) => {
        console.log(firebase.auth().currentUser.uid)
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
    return (
        <Container>
            <Row>
                <Col id="card-container">
                    {
                        showArray.map((item, index) => {
                            return (
                                <TinderCard key={item.fbid} ref={childRefs[index]} onCardLeftScreen={() => outOfFrame(item.title)} className='swipe' onSwipe={(dir) => swiped(dir, item.fbid)}>
                                    <Container >
                                        <Row className="card-image">
                                            <Col>
                                                <Image id="media-img" src={item.image} alt="show poster" rounded />
                                            </Col>
                                        </Row>
                                        <Row id="card-options">
                                            <Col xs={3}>
                                                <Button onClick={() => swipe('left')} variant="link">
                                                    <IoCloseCircleOutline color="white" size="5em" />
                                                </Button>
                                            </Col>
                                            <Col xs={3} >
                                                <Link to={`/showdetail/${item.fbid}`} id="card-detail-button">
                                                    <h2 id="card-detail-button-text">Details</h2>
                                                    <FiChevronDown color="white" size="3em" />
                                                </Link>
                                            </Col>
                                            <Col xs={3}>
                                                <Button onClick={() => swipe('right')} variant="link">
                                                    <IoCheckmarkCircleOutline color="white" size="5em" />
                                                </Button>
                                            </Col>
                                        </Row>
                                    </Container>
                                </TinderCard>
                            )
                        })
                    }
                </Col>
            </Row>
        </Container>
    )
}