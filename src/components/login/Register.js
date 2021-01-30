import React, { useRef } from "react";
import { Button, InputGroup, Input, Form, Row, Col, FormControl } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
// import "./Login.css";

export const Register = props => {
    const username = useRef();
    const email = useRef();
    const verifyPassword = useRef();
    const conflictDialog = useRef();
    const history = useHistory();

    const existingUserCheck = () => {
        return fetch(`http://localhost:8088/users?email=${email.current.value}`)
            .then(res => res.json())
            .then(user => !!user.length);
    };

    const handleRegister = e => {
        e.preventDefault();

        existingUserCheck().then(userExists => {
            if (!userExists) {
                fetch("http://localhost:8088/users", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        email: email.current.value,
                        username: `${username.current.value}`
                    })
                })
                    .then(_ => _.json())
                    .then(createdUser => {
                        if (createdUser.hasOwnProperty("id")) {
                            sessionStorage.setItem("active_user", createdUser.id);
                            history.push("/");
                        }
                    });
            } else {
                conflictDialog.current.showModal();
            }
        });
    };

    return (
        <>
            <Row textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
                <Col style={{ maxWidth: 450 }}>
                    <h1 color='teal' textAlign='center' className="LaughTrackHeadline">
                        Laugh Track
                    </h1>
                    <dialog className="dialog dialog--password" ref={conflictDialog}>
                        <div>Account with that email address already exists</div>
                        <button
                            className="button--close"
                            onClick={e => conflictDialog.current.close()}> Close </button>
                    </dialog>
                    <Form size='large' onSubmit={handleRegister}>
                        <InputGroup stacked>
                            <FormControl
                                ref={username}
                                type="text"
                                name="username"
                                className="form-control"
                                placeholder="Username"
                                required
                                autoFocus
                            />
                            <FormControl
                                ref={email}
                                type="email"
                                name="email"
                                className="form-control"
                                placeholder="Email address"
                                required
                            />
                            <Button type="submit" fluid size='compact'>
                                <p className="loginButton">Sign Up</p>
                            </Button>
                        </InputGroup>
                    </Form>
                    <p>
                        Already have an account? <Link to="/login" id="sign-register">Log in</Link>
                    </p>
                </Col>
            </Row>
        </>
    );
};
