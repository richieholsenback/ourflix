import React, { useContext, useEffect } from "react"
import { Col, Row, Container } from "react-bootstrap"
import { MediaCard } from "../card/Card"
import { MovieContext } from "./MovieProvider"
import { IoFilter } from "react-icons/io5";
import { Swipeable, direction } from 'react-deck-swiper';
import "../../scss/_list.scss"

export const MovieList = () => {

    const { movies, getMovies } = useContext(MovieContext)
    const [lastSwipeDirection, setLastSwipeDirection] = React.useState(null);

    useEffect(() => {
        getMovies()
    }, [])

    const liked = []
    const disliked = []

    const handleOnSwipe = (swipeDirection, media) => {
        if (swipeDirection === direction.RIGHT) {
            setLastSwipeDirection('your right');
        }

        if (swipeDirection === direction.LEFT) {
            setLastSwipeDirection('your left');
        }
    }

    return (
        <Container>
            <Row>
                <Col id="filter">
                    <IoFilter color="white" />
                    <p>Filter</p>
                </Col>
            </Row>
            <Row>
                <Col>
                    {
                        movies.map(item => {
                            return (
                                <Swipeable onSwipe={handleOnSwipe}>
                                    <MediaCard key={item.netflixid} item={item} />
                                </Swipeable>
                            )
                        })
                    }
                </Col>
            </Row>
        </Container>
    )
}

