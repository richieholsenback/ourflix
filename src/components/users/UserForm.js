import React, { useEffect, useState } from "react"
import "../scss/user.scss"
import { useHistory, useParams } from 'react-router-dom';
import firebase from "firebase/app";
import { GetOneUser, getOneUserAlt, updateUser } from "../../modules/APICalls";
import { Button, Col, Container, Form, Row } from "react-bootstrap";

export const UserForm = () => {

    const [user, setUser] = useState({})
    const history = useHistory();
    const { uid } = useParams()

    const handleInputChange = (event) => {
        const newUser = { ...user }
        newUser[event.target.id] = event.target.value
        setUser(newUser)
    }

    const handleUpdateItem = () => {
        const newUser = { ...user }
        newUser.uid = uid;
        // newUser.createdAt = firebase.auth().currentUser.createdAt;
        // newUser.apiKey = firebase.auth().currentUser.apiKey;
        // newUser.email = firebase.auth().currentUser.email;
        // newUser.lastLoginAt = firebase.auth().currentUser.lastLoginAt;
        updateUser(newUser)
            .then(response => history.push(`/myprofile/${uid}`))
    }

    useEffect(() => {
        getOneUserAlt(uid)
            .then(response => setUser(response))
    }, [uid])

    return (
        <Container>
            <Row className="justify-content-md-center">
                <Col xs={6}>
                    <h2 className="userForm__title">Your Profile Info</h2>
                    <br />
                    <br />
                    <Form className="userForm" onChange={handleInputChange}>
                        <Form.Group controlId="displayName">
                            <p>User Name</p>
                            <Form.Control type="text" value={user?.displayName} />
                        </Form.Group>
                        <br />
                        <Form.Group controlId="photoURL">
                            <p>Profile Pic</p>
                            <Form.Control type="input" value={user?.photoURL} />
                        </Form.Group>

                        <Button onClick={handleUpdateItem}>Save Changes</Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    )
}