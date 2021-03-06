import React, { useEffect, useState } from "react"
import { Col, Container, Image, Row, Button } from "react-bootstrap"
import { useParams } from "react-router-dom"
import "../../scss/card.scss"
import { GetFriendMovie, GetOneMovie, unlikeMovie } from "../../../modules/APICalls"
import { BiStar } from "react-icons/bi"
import { FaPlay } from "react-icons/fa"

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
                {console.log(media.fbid)}
                    <Image id="media-img-detail" src={media.image} alt="media or show poster" rounded />
                    <div id="media-descrip">
                        <h2>{media.title}</h2>
                        <p>{media.released}</p>
                        <p><BiStar />{media.rating}/10</p>
                        <p>{media.runtime}</p>
                        <p>{media.synopsis}</p>
                    </div>
                    <div>
                        {/* <Button id="white-fill-button" onClick={Unlike(media.fbid)}>Unlike</Button> */}
                        <a id="preview" href={"https://www.netflix.com/title/" + media.netflixid} target="_blank" rel="noreferrer">
                            <button id="white-fill-button"><FaPlay size="0.8em" /> Watch Now</button>
                        </a>
                    </div>
                </Col>
            </Row>
        </Container>
    )
}