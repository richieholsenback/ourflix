import React, { useEffect, useState } from "react"
import { Button, Col, Container, Image, Row } from "react-bootstrap"
import { Link, useParams } from "react-router-dom"
import "../../scss/card.scss"
import { GetFriendMovie, GetOneMovie, Unlike } from "../../../modules/APICalls"
import { BiStar } from "react-icons/bi"
import { FaPlay } from "react-icons/fa"
import { setActiveLink } from "react-scroll/modules/mixins/scroller"

export const LikedMediaDetails = () => {
    
    const [media, setMedia] = useState({})
    const [mediaArray, setMediaArray] = useState({})
    const { netflixid } = useParams();

    const getAllMovies = () => {

        GetFriendMovie(netflixid)
            .then(data => {
                let arrayWithFBID = Object.keys(data).map((key, index) => {
                    data[key].fbid = key;
                    return data[key];
                })
                //and sort with most recent date first
                arrayWithFBID.sort((a, b) => (a.timestamp < b.timestamp) ? 1 : -1)
                setMediaArray(arrayWithFBID)
            })
    }

    useEffect(() => {
        getAllMovies()
        GetFriendMovie(netflixid)
            .then(response => {
                const result = Object.keys(response)
                GetOneMovie(result)
                    .then(response => {
                        setMedia(response)
                    })
            })
    }, [])

    return (
        <Container id="card-container">
            <Row className="card-image">
                <Col>
                    <Image id="media-img-detail" src={media.image} alt="media or show poster" rounded />
                    <div id="media-descrip">
                        <h2>{media.title}</h2>
                        <p>{media.released}</p>
                        <p><BiStar />{media.rating}/10</p>
                        <p>{media.runtime}</p>
                        <p>{media.synopsis}</p>
                    </div>
                    <div>
                        {/* <Button id="white-fill-button" onClick={Unlike(media.netflixid)}>Unlike</Button> */}
                        <a id="preview" href={"https://www.netflix.com/title/" + media.netflixid} target="_blank" rel="noreferrer">
                            <button id="white-fill-button"><FaPlay size="0.8em"/> Watch Now</button>
                        </a>
                        </div>
                </Col>
            </Row>
        </Container>
    )
}