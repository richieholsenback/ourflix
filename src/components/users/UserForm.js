import React, { useEffect, useState } from "react"
import "../scss/user.scss"
import { useHistory, useParams } from 'react-router-dom';
import firebase from "firebase/app";
import { GetOneUser, updateUser } from "../../modules/APICalls";
import { Button, Col, Container, Form, Row } from "react-bootstrap";

export const UserForm = () => {

    const [user, setUser] = useState({})
    const history = useHistory();
    const { fbid } = useParams()

    const handleInputChange = (event) => {
        const newUser = { ...user }
        newUser[event.target.id] = event.target.value
        setUser(newUser)
    }

    const handleUpdateItem = () => {
        const newUser = { ...user }
        newUser.uid = firebase.auth().currentUser.uid;
        newUser.createdAt = firebase.auth().currentUser.createdAt;
        newUser.apiKey = firebase.auth().currentUser.apiKey;
        newUser.email = firebase.auth().currentUser.email;
        newUser.lastLoginAt = firebase.auth().currentUser.lastLoginAt;
        updateUser(newUser)
            .then(response => history.push("/users"))
    }

    useEffect(() => {
        GetOneUser(fbid)
            .then((user) => {
                setUser(user)
            })
    }, [fbid])

    return (
        <Container>
            <Row>
                <Col>
                        <h2 className="userForm__title">Your Profile Info</h2>
                    <Form className="userForm" onChange={handleInputChange}>
                        <Form.Group controlId="displayName">
                            <Form.Label>User Name</Form.Label>
                            <Form.Control type="text" value={user?.displayName} />
                        </Form.Group>

                        <Form.Group controlId="photoURL">
                            <Form.Label>Profile Pic</Form.Label>
                            <Form.Control type="input" value={user?.photoURL} />
                        </Form.Group>

                        <Button onClick={handleUpdateItem}>Save Changes</Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    )
}