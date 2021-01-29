import React from "react"
import { Col, Container, Image, Row } from "react-bootstrap"
import { IoCloseCircleOutline, IoCheckmarkCircleOutline } from "react-icons/io5"
import { FiChevronDown } from "react-icons/fi"
import { BiStar } from "react-icons/bi";
import "../../scss/_card.scss"
import poster from "../../../images/New_Girl.jpg"

export const MediaDetails = ({ result }) => {
    return (
        <Container id="card-container">
            <Row className="card-image">
                <Col>
                    <Image id="media-img-detail" src={poster} alt="movie or show poster" rounded />
                    <div id="media-descrip">
                        {/* <Image id="media-img detail" src={result.img} alt="movie or show poster" rounded /> */}
                        <h2>New Girl</h2>
                        {/* <h2>{result.title}</h2> */}
                        <p>2008</p>
                        <p><BiStar />10/10</p>
                        <p>{new Date(1000 * 1000).toISOString().substr(11, 8)}</p>
                        <p>After a bad break-up, Jess, an offbeat young woman, moves into an apartment loft with three single men. Although they find her behavior very unusual, the men support her - most of the time.</p>
                    </div>
                    <div id="preview">
                        <button id="white-fill-button">Preview</button>
                    </div>
                </Col>
            </Row>
            <Row className="card-options">
                <Col xs={4}><IoCloseCircleOutline color="white" size="5em" /></Col>
                <Col xs={4} id="card-detail-button">
                    <h2 id="card-detail-button-text">Details</h2>
                    <FiChevronDown color="white" size="3em" />
                </Col>
                <Col xs={4}><IoCheckmarkCircleOutline color="white" size="5em" /></Col>
            </Row>
        </Container>
    )
}