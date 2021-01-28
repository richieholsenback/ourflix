import React, { useContext, useEffect } from "react"
import { Col, Row, Container } from "react-bootstrap"
import { MediaCard } from "../card/Card"
import { MovieContext } from "./MovieProvider"
import { IoFilter } from "react-icons/io5";
import "../../scss/_list.scss"

export const MovieList = () => {

    const { movies, getMovies } = useContext(MovieContext)

    useEffect(() => {
        getMovies()
    }, [])

    return (
        <Container>
        <Row>
            <Col id="filter">
            <IoFilter color="white"/>
            <p>Filter</p>
            </Col>
        </Row>
        <Row>
        <Col>
            {
                movies.map(result => {
                    return <MediaCard key={result.id} result={result} />
                })
            }
        </Col>
        </Row>
        </Container>
    )
}

