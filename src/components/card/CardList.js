import React, { useContext, useEffect, useMemo, useState } from "react"
import { MediaContext } from "./CardMediaProvider"
import TinderCard from "react-tinder-card"
import { Col, Container, Image, Row } from "react-bootstrap"
import { IoCheckmarkCircleOutline, IoCloseCircleOutline } from "react-icons/io5"
import { FiChevronDown } from "react-icons/fi"
// import { Button } from "bootstrap"
import "../scss/_card.scss"
import { Button } from "bootstrap"

export const CardList = () => {

    const liked = []
    const disliked = []
    const { results, getResults } = useContext(MediaContext)

    useEffect(() => {
        getResults()
    }, [])
    let resultsState = results

    const [medias, setMedias] = useState(results)
    const [lastDirection, setLastDirection] = useState()

    const childRefs = useMemo(() => Array(results.length).fill(0).map(i => React.createRef()), [])

    const swiped = (direction, nameToDelete) => {
        console.log('removing: ' + nameToDelete, direction)
        setLastDirection(direction)
        if (direction === "right"){
        liked.push(nameToDelete)
    } else if (direction === "left"){
        disliked.push(nameToDelete)
    }
}

    const outOfFrame = (reuslt) => {
        console.log(reuslt + ' left the screen!')
        resultsState = resultsState.filter(result => result.id !== result)
        setMedias(resultsState)
    }

    const swipe = (dir) => {
        const cardsLeft = medias.filter(result => !liked.includes(result.id))
        if (cardsLeft.length) {
            const toBeRemoved = cardsLeft[cardsLeft.length - 1].id // Find the card object to be removed  
            const index = results.map(result => result.id).indexOf(toBeRemoved) // Find the index of which to make the reference to
            liked.push(toBeRemoved) // Make sure the next card gets removed next time if this card do not have time to exit the screen
            childRefs[index].current.swipe(dir) // Swipe the card!
        }
    }



    return (
        <div>
            {
                results.map((result, index) => {
                    return <TinderCard ref={childRefs[index]} className='swipe' key={result.id} result={result} onSwipe={(dir) => swiped(dir, result.id)} onCardLeftScreen={() => outOfFrame(result.id)}>
                        <Container id="card-container">
                            <Row className="card-image">
                                <Col>
                                    <Image id="media-img" src={result.img} alt="movie or show poster" rounded />
                                </Col>
                            </Row>
                            <Row className="card-options">
                                <Col xs={4}>
                                    <button onClick={() => swipe('left')}>Swipe left!</button>
                                    {/* <Button onClick={() => swipe('left')}>
                                        <IoCloseCircleOutline color="white" size="6em" />
                                    </Button> */}
                                </Col>
                                <Col xs={4} id="card-detail-button">
                                    <FiChevronDown color="white" size="3em" />
                                    <h2 id="card-detail-button-text">Details</h2>
                                </Col>
                                <Col xs={4}>
                                    <button onClick={() => swipe('right')}>Swipe right!</button>
                                    {/* <Button onClick={() => swipe('left')}>
                                        <IoCheckmarkCircleOutline color="white" size="6em" />
                                </Button> */}
                                </Col>
                            </Row>
                        </Container>
                    </TinderCard>
                })
            }
        </div>
    )
}