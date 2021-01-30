import React, { useContext, useEffect, useState } from "react"
import { MediaContext } from "./CardMediaProvider"
import { MediaCard } from "./Card"
import TinderCard from 'react-tinder-card'
import { Col, Container, Row } from "react-bootstrap"
import "../../scss/_card.scss"
import { IoFilter } from "react-icons/io5"

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
        if (direction === "left") {
            disliked.push(media)
            console.log(disliked)
        } else if (direction === "right") {
            liked.push(media)
            console.log(liked)
        }
    }

    const onCardLeftScreen = (direction, media) => {
        if (direction === "left") {
            // disliked.push(media)
            console.log(disliked)
        } else if (direction === "right") {
            // liked.push(media)
            console.log(liked)
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
                        items.map(item => {
                            return <TinderCard
                                onSwipe={() => onSwipe(item)}
                                onCardLeftScreen={() => onCardLeftScreen(item.netflixid)}
                                preventSwipe={['down']}
                            >
                                <MediaCard  key={item.nfid}
                                item={item}/>
                            </TinderCard>
                        })
                    }
                </Col>
            </Row>
        </Container>
    )
}

