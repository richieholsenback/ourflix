import React, { useEffect, useMemo, useState } from "react"
import { Col, Row, Container, Image, Button } from "react-bootstrap"
import { addDislike, addLike, getMovies } from "../../../modules/APICalls"
import "../../scss/_list.scss"
import TinderCard from "react-tinder-card";
import { Link, useHistory } from "react-router-dom"
import { IoCheckmarkCircleOutline, IoCloseCircleOutline } from "react-icons/io5"
import { FiChevronDown } from "react-icons/fi"

export const MovieList = () => {

    const [movieArray, setMovieArray] = useState([])
    const [isLoading, setIsLoading] = useState(true);

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

    const alreadyRemoved = []
    let MovieState = movieArray

    const [movies, setMovies] = useState(movieArray)
    const [lastDirection, setLastDirection] = useState()
    const history = useHistory();

    const childRefs = useMemo(() => Array(movieArray.length).fill(0).map(i => React.createRef()), [])

    const swiped = (direction, idOfMovie) => {
        setLastDirection(direction)
        const userId = parseInt(sessionStorage.getItem("active_user"))
        if (direction === "right") {
            addLike({
                userUid: userId,
                movieId: idOfMovie
            })
        } else if (direction === "left") {
            addDislike({
                userUid: userId,
                movieId: idOfMovie

            })
        }
    }


    const outOfFrame = (title) => {
        console.log(title + ' left the screen!')
        MovieState = MovieState.filter(movie => movie.title !== title)
        setMovies(MovieState)
    }

    const swipe = (dir) => {
        const cardsLeft = movies.filter(movie => !alreadyRemoved.includes(movie.title))
        if (cardsLeft.length) {
            const toBeRemoved = cardsLeft[cardsLeft.length - 1].title // Find the card object to be removed
            const index = movieArray.map(movie => movie.title).indexOf(toBeRemoved) // Find the index of which to make the reference to
            alreadyRemoved.push(toBeRemoved) // Make sure the next card gets removed next time if this card do not have time to exit the screen
            childRefs[index].current.swipe(dir) // Swipe the card!
        }
    }


    return (
        <Container>
            <Row>
                <Col id="card-container">
                    {
                        movieArray.map((item, index) => {
                            return (
                                <TinderCard key={item.fbid} ref={childRefs[index]} onCardLeftScreen={() => outOfFrame(item.title)} className='swipe' onSwipe={(dir) => swiped(dir, item.uid)}>
                                    <Container >
                                        <Row className="card-image">
                                            <Col>
                                                <Image id="media-img" src={item.image} alt="movie or show poster" rounded />
                                            </Col>
                                        </Row>
                                        <Row id="card-options">
                                            <Col xs={3}>
                                                <Button onClick={() => swipe('left')} variant="dark">
                                                    <IoCloseCircleOutline color="white" size="5em" />
                                                </Button>
                                            </Col>
                                            <Col xs={3} >
                                                <Link to={`movies/details/${item.nfid}`} id="card-detail-button">
                                                    <h2 id="card-detail-button-text">Details</h2>
                                                    <FiChevronDown color="white" size="3em" />
                                                </Link>
                                            </Col>
                                            <Col xs={3}>
                                                <Button onClick={() => swipe('right')} variant="dark">
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


