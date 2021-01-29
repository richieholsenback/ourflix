import React, { useContext, useEffect, useState } from "react"
import { MediaContext } from "./CardMediaProvider"
import { MediaCard } from "./Card"
import TinderCard from 'react-tinder-card'
import { Button, Col, Container, Image, Row } from "react-bootstrap"
import { IoCheckmarkCircleOutline, IoCloseCircleOutline } from "react-icons/io5"
import { FiChevronDown } from "react-icons/fi"
import "../../scss/_card.scss"

export const AllList = () => {

    const { items, getItems } = useContext(MediaContext)
    const [lastDirection, setLastDirection] = useState()

    // const db = items

    const liked = []
    const disliked = []

    useEffect(() => {
        getItems()
        console.log(items)
    }, [])

    // const swiped = (direction, nameToDelete) => {
    //     console.log('removing: ' + nameToDelete)
    //     setLastDirection(direction)
    //     liked.push(nameToDelete)
    //   }

    const onSwipe = (direction, media) => {
        if(direction === "left"){
            disliked.push(media)
            console.log(disliked)
        } else if(direction === "right"){
            liked.push(media)
            console.log(liked)
        }
      }

      const onCardLeftScreen = (direction, media) => {
        if(direction === "left"){
            // disliked.push(media)
            console.log(disliked)
        } else if(direction === "right"){
            // liked.push(media)
            console.log(liked)
        }
      }

    return (
        <div>
            {
                items.map(item => {
                    return <TinderCard
                        key={item.netflixid}
                        item={item}
                        onSwipe={() => onSwipe(item)} 
                        onCardLeftScreen={() => onCardLeftScreen(item.netflixid)} 
                        preventSwipe={['down']}
                    >
                        <Container id="card-container">
                            <Row className="card-image">
                                <Col>
                                    <Image id="media-img" src={item.image} alt="movie or show poster" rounded />
                                </Col>
                            </Row>
                            <Row className="card-options">
                                <button id="outline-button">Not Interested</button>
                                <Col id="card-detail-button">
                                    <h2 id="card-detail-button-text">Details</h2>
                                    <FiChevronDown color="white" />
                                </Col>
                                <button id="outline-button">Interested</button>
                            </Row>
                        </Container>
                    </TinderCard>
                })
            }
        </div>
    )
}

