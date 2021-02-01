import React, { useContext, useEffect, useMemo, useState } from "react"
import { MediaContext } from "./CardMediaProvider"
import { MediaCard } from "./Card"
import TinderCard from 'react-tinder-card'
import { Col, Container, Row } from "react-bootstrap"
import "../../scss/_card.scss"
import { IoFilter } from "react-icons/io5"

export const AllList = () => {


    const { items, getItems } = useContext(MediaContext)
    const { setItems } = useState([])
    const [lastDirection, setLastDirection] = useState()

    let db = items

    const childRefs = useMemo(() => Array(db.length).fill(0).map(i => React.createRef()), [])

    const swiped = (direction, nameToDelete) => {
        console.log('removing: ' + nameToDelete)
        setLastDirection(direction)
        liked.push(nameToDelete)
    }

    const outOfFrame = (title) => {
        console.log(title + ' left the screen!')
        const subset = db.filter(item => item.title !== title)
        setItems(subset)
    }

    const swipe = (dir) => {
        const cardsLeft = items.filter(item => !liked.includes(item.nfid))
        if (cardsLeft.length) {
            const toBeRemoved = cardsLeft[cardsLeft.length - 1].nfid // Find the card object to be removed
            const index = db.map(item => item.nfid).indexOf(toBeRemoved) // Find the index of which to make the reference to
            liked.push(toBeRemoved) // Make sure the next card gets removed next time if this card do not have time to exit the screen
            childRefs[index].current.swipe(dir) // Swipe the card!
        }
    }

    const liked = []
    const disliked = []

    useEffect(() => {
        getItems()
        console.log(liked)
    }, [])



    // const onSwipe = (direction, media) => {
    //     if (direction === "left") {
    //         disliked.push(media)
    //         console.log(disliked)
    //     } else if (direction === "right") {
    //         liked.push(media)
    //         console.log(liked)
    //     }
    // }

    // const onCardLeftScreen = (direction, media) => {
    //     if (direction === "left") {
    //         // disliked.push(media)
    //         console.log(disliked)
    //     } else if (direction === "right") {
    //         // liked.push(media)
    //         console.log(liked)
    //     }
    // }



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
                        items.map((item, index) => {
                            return <TinderCard
                                ref={childRefs[index]}
                                className='swipe'
                                // onSwipe={(dir) => swiped(dir, item.nfid)}
                                // onCardLeftScreen={() => outOfFrame(item.netflixid)}
                                preventSwipe={['down']}
                            >
                                <MediaCard key={item.nfid}
                                    item={item} />
                            </TinderCard>
                        })
                    }
                    <div className='buttons'>
                        <button onClick={() => swipe('left')}>Swipe left!</button>
                        <button onClick={() => swipe('right')}>Swipe right!</button>
                    </div>
                </Col>
            </Row>
        </Container>
    )
}


