import React, { useContext, useEffect } from "react"
import { MediaContext } from "./CardMediaProvider" 
import { MediaCard } from "./Card"
import { Col, Container, Row } from "react-bootstrap"
import "../../scss/_card.scss"
import { IoFilter } from "react-icons/io5"

export const AllList = () => {


    const { items, getItems } = useContext(MediaContext)

    useEffect(() => {
        getItems()
    }, []
    )

    return (
        <Container>
            <Row>
                <Col>
                    {
                        items.map((item, index) => {
                            return( <MediaCard key={item.nfid} item={item} />)
                        })
                    }
                </Col>
            </Row>
        </Container>
    )
}