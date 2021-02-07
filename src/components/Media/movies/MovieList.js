import React, { useEffect, useMemo, useState } from "react"
import { Col, Row, Container, Image, Button } from "react-bootstrap"
import { addDislike, addLike, getMovies } from "../../../modules/APICalls"
import "../../scss/_list.scss"
import "../../scss/_advanced.scss"
import TinderCard from "react-tinder-card";
import { Link, useHistory } from "react-router-dom"
import { IoCheckmarkCircleOutline, IoCloseCircleOutline } from "react-icons/io5"
import { FiChevronDown } from "react-icons/fi"
import firebase from "firebase/app";

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
        console.log(title + ' left the screen!')
        MovieState = MovieState.filter(movie => movie.title !== title)
        setMovies(MovieState)
    }

    const swipe = (item, dir) => {
        const cardsLeft = movies.filter(movie => !alreadyRemoved.includes(movie.title))
        if (cardsLeft.length) {
            const toBeRemoved = cardsLeft[cardsLeft.length - 1].title // Find the card object to be removed
            const index = movieArray.map(movie => movie.title).indexOf(toBeRemoved) // Find the index of which to make the reference to
            childRefs[index].current.swipe(dir) // Swipe the card!
            //     if(dir === "left"){ // Make sure the next card gets removed next time if this card do not have time to exit the screen
        //     handleAddDisike(item.fbid)
        //     childRefs[index].current.swipe(dir) // Swipe the card!
        // } else if(dir === "right"){
        //     handleAddLike(item.fbid)
        //     childRefs[index].current.swipe(dir)
        // }
    }
    }

    const [like, setLike] = useState({});
    const [dislike, setDislike] = useState({});

  const handleInputChange = (event) => {
    const newLikeObj = { ...like };
    newLikeObj[event.target.id] = event.target.value;
    setLike(newLikeObj);
  }

  const handleAddLike = (item) => {
    const newLikeObj = { ...like };
    newLikeObj.userUid = firebase.auth().currentUser.uid;
    newLikeObj.resultUid = item;
    addLike(newLikeObj)
      .then(response => history.push("/"))
  }

  const handleAddDisike = (item) => {
    const newDislikeObj = { ...like };
    newDislikeObj.userUid = firebase.auth().currentUser.uid;
    newDislikeObj.resultUid = item;
    addDislike(newDislikeObj)
      .then(response => history.push("/"))
  }

  const likeCheck = (userObj) => {
    const hasLiked = movieArray.find(movie => movie.fbid === userObj.fbid)
    if (!hasLiked) {
      return ( null )
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
                                <TinderCard key={item.fbid} ref={childRefs[index]} onCardLeftScreen={() => outOfFrame(item.title)} className='swipe' onSwipe={(dir) => swiped(dir, item.uid)}>
                                    <Container className="card-image">
                                        <Row >
                                            <Col>
                                                <Image id="media-img" src={item.image} alt="movie or show poster" rounded />
                                            </Col>
                                        </Row>
                                        <Row id="card-options">
                                            <Col xs={3}>
                                                <Button onClick={() => handleAddDisike(`${item.fbid}`, "left")} variant="link">
                                                    <IoCloseCircleOutline color="white" size="5em" />
                                                </Button>
                                            </Col>
                                            <Col xs={3} >
                                                <Link to={`/movie/details/${item.fbid}`} id="card-detail-button">
                                                    <h6 id="card-detail-button-text">Details</h6>
                                                    <FiChevronDown color="white" size="3em" />
                                                </Link>
                                            </Col>
                                            <Col xs={3}>
                                                <Button onClick={() => swipe(`${item.fbid}`, "right")} variant="link">
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


