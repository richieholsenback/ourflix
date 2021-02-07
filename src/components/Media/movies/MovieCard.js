import { Button } from "bootstrap"
import { Col, Container, Image, Row } from "react-bootstrap"
import { FiChevronDown } from "react-icons/fi"
import { IoCheckmarkCircleOutline, IoCloseCircleOutline } from "react-icons/io5"
import { Link } from "react-router-dom"
import TinderCard from "react-tinder-card"
import { addDislike, addLike } from "../../../modules/APICalls"
import firebase from "firebase/app";
import { useState } from "react"

export const MovieCard = (item) => {

    const [like, setLike] = useState({});
    const [dislike, setDislike] = useState({});

    const handleAddLike = (item) => {
        const newLikeObj = { ...like };
        newLikeObj.userUid = firebase.auth().currentUser.uid;
        newLikeObj.resultUid = item;
        addLike(newLikeObj)
      }
    
      const handleAddDisike = (item) => {
        const newDislikeObj = { ...dislike };
        newDislikeObj.userUid = firebase.auth().currentUser.uid;
        newDislikeObj.resultUid = item;
        addDislike(newDislikeObj)
      }


      return (
    
      <Container className="card-image">
          <Row >
              <Col>
                  <Image id="media-img" src={item.image} alt="movie or show poster" rounded />
              </Col>
          </Row>
          <Row id="card-options">
              <Col xs={3}>
                  <Button onClick={() => handleAddDisike(`${item.fbid}`)} variant="link">
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
                  <Button onClick={() => handleAddLike(`${item.fbid}`)} variant="link">
                      <IoCheckmarkCircleOutline color="white" size="5em" />
                  </Button>
              </Col>
          </Row>
      </Container>
)
}