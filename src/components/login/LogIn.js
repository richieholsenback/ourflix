import React, { useRef } from "react";
import { Button, InputGroup, Input, Form, Row, Col, FormControl } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";

export const Login = props => {
    const email = useRef();
    const password = useRef();
    const existDialog = useRef();
    const history = useHistory();



    const existingUserCheck = () => {
        return fetch(`http://localhost:8088/users?email=${email.current.value}`)
            .then(res => res.json())
            .then(user => (user.length ? user[0] : false));
    };

    const handleLogin = e => {
        e.preventDefault();

        existingUserCheck().then(exists => {
            if (exists) {
                sessionStorage.setItem("active_user", exists.id);
                history.push("/");
            } else {
                existDialog.current.showModal();
            }
        });
    };

    return (
        <>
            <Row textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
                <Col style={{ maxWidth: 450 }}>
                    <h1 className="LaughTrackHeadline" textAlign='center'>
                        Laugh Track
                    </h1>
                    <section className="container--login">
                        <dialog className="dialog dialog--auth" ref={existDialog}>
                            <div>User does not exist</div>
                            <Button
                                className="button--close"
                                onClick={e => existDialog.current.close()}
                            >
                                Close
                    </Button>
                        </dialog>
                    </section>
                    <Form size='large' onSubmit={handleLogin}>
                        <InputGroup stacked>
                            <FormControl
                                fluid
                                icon='user'
                                iconPosition='left'
                                placeholder='E-mail address'
                                ref={email}
                                type="email"
                                id="email"
                                className="emailInput"
                                required
                                autoFocus
                            ></FormControl>

                            <Button type="submit" fluid size='compact'>
                                <p className="loginButton">Login</p>
                            </Button>
                        </InputGroup>
                    </Form>
                    <p>
                        New around here? <Link to="/register" id="sign-register">Sign Up</Link>
                    </p>
                </Col>
            </Row>
        </>
    );
};
