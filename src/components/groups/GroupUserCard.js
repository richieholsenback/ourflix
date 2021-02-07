import React, { useState } from "react"
import { Image, Button, Row, Col } from "react-bootstrap"
import { Link, useHistory } from "react-router-dom"
import { addGroupUser } from "../../modules/APICalls"
import "../scss/_user.scss"
import firebase from "firebase/app";

export const GroupUserCard = ({ user }) => {
    const [userItem, setUserItem] = useState({})

    const history = useHistory()

    const handleAddUser = (userId) => {

        const newUserObj = { ...userItem };
        newUserObj.useredById = firebase.auth().currentUser.uid;
        newUserObj.userId = userId;
        addGroupUser(newUserObj)
            .then(response => history.push("/users"))
    }

    return (
        <>
            <Row>
                <Col xs={1}>
                        <Image src={user.photoURL} alt="user pic" id="user-pic" />
                </Col>
                <Col xs={4}>
                        <h2>{user.displayName}</h2>
                </Col>
                <Col>
                    <Button
                        type="submit"
                        onClick={() => {
                            handleAddUser(user.uid)
                        }}
                    >
                        Add User
            </Button>
                </Col>
            </Row>
        </>
    )
}