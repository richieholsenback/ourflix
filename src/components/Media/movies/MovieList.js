import React, { useEffect, useState } from "react"
import { Col, Row, Container } from "react-bootstrap"
import { MediaCard } from "../card/Card"
import { getMovies } from "../../../modules/APICalls"
import { IoFilter } from "react-icons/io5";
import "../../scss/_list.scss"

export const MovieList = () => {

    const [movieArray, setMovieArray] = useState([])

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
                console.log(movieArray)
            })
    }

    useEffect(() => {	
        getAllMovies()
	}, [])

    return (
        <Container>
            <Row>
                <Col>
                    {
                        movieArray.map(item => {
                            return (
                                <MediaCard key={item.fbid} item={item} />
                            )
                        })
                    }
                </Col>
            </Row>
        </Container>
    )
}

