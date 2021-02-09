import React, { useContext, useEffect, useState } from "react"
import { Col, Container, Row } from "react-bootstrap"
import { useParams } from "react-router-dom"
import "../scss/friend.scss"

// export const FriendDetails = ({ }) => {

//     const [friend, setFriend] = useState({})
//     const [user, setUser] = useState({})

//     const { friendId } = useParams();

//     useEffect(() => {
//         getFriendById(friendId)
//             .then(response => {
//                 setFriend(response)
//                 setUser(response.user)
//             })
//     }, [])

//     return (
//         <Container id="friend-page">
//             <Row>
//                 <Col>
//                     <h2>You and {user.firstName} should watch</h2>
//                 </Col>
//             </Row>
//             <br />
//             <Row>
//                 <Col>
//                     <h3>Movies</h3>
//                 </Col>
//             </Row>
//             <Row>
//                 <Col>
//                     <h3>TV Shows</h3>
//                 </Col>
//             </Row>
//         </Container>
//     )
// }

