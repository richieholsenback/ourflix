import React, { useEffect, useState } from "react"
import { Col, Container, Row } from "react-bootstrap"
import { getFriends } from "../../modules/APICalls"
import { FriendCard } from "./FriendCard"

export const FriendList = () => {

    const [friendArray, setFriendArray] = useState([])

    // const [lastSwipeDirection, setLastSwipeDirection] = React.useState(null);

    // const getAllFriends = () => {
    //     getFriends()
    //         .then(data => {
    //             console.log("fb data", data)
    //             let arrayWithFBID = Object.keys(data).map((key, index) => {
    //                 data[key].fbid = key;
    //                 return data[key];
    //             })

    //             console.log("arrayWithFBID", arrayWithFBID);
    //             //and sort with most recent date first
    //             arrayWithFBID.sort((a, b) => (a.timestamp < b.timestamp) ? 1 : -1)
    //             setFriendArray(arrayWithFBID)
    //         })
    // }

    useEffect(() => {
        getFriends()
    }, [])


    return (
        <Container className="friends">
            <Row>
                <Col>
                    <h2>Your Friends</h2>
                    <div className="followingList">
                        {
                            friendArray.map(friend => {
                                return <FriendCard key={friend.id} friend={friend} user={friend.user} />
                            })
                        }
                    </div>
                </Col>
            </Row>
        </Container>
    )
}