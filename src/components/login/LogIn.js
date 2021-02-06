import React, { useState, useContext } from "react";
import { Button, Form, Container, Row, Col, Image } from 'react-bootstrap';
import { useHistory, Link } from "react-router-dom";
import { FirebaseContext } from "../fbAuth/FirebaseProvider";
import "../scss/_login.scss"

export const LogIn = () => {
  const history = useHistory();
  const { login } = useContext(FirebaseContext);
  const { signInWithGoogle } = useContext(FirebaseContext);

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const loginSubmit = (e) => {
    e.preventDefault();
    login(email, password)
      .then(() => history.push("/"))
      .catch(() => alert("Invalid email or password"));
  };

  const loginGoogle = () => {
    signInWithGoogle()
  }


  return (

    <>
      <Container >
        <Row className="justify-content-md-center">
          <Col className="m-2" md={6}>
            <Image id="nav-brand" src="https://fontmeme.com/permalink/210127/9162a5835f5b4c9cf29e6e2d37f7519c.png" alt="netflix-font" />
            <h4 className="username">Sign In</h4>
            <Form onSubmit={loginSubmit} >
              <fieldset>
                <Form.Group controlId="formBasicEmail" className="mb-2" >
                  <Form.Control type="email" placeholder="Email Address" onChange={e => setEmail(e.target.value)} id="gray-input" />
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                  <Form.Control type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} id="gray-input" />
                </Form.Group>

                <Button block type="submit" id="button-sign-in-red">Sign In</Button>

              </fieldset>
            </Form>

            <h5 className="username">
              Need an account?
        </h5>
            <Link to="register" className="btn btn-block btn-light" id="button-sign-in">Create one with your email</Link>
            <Button block onClick={loginGoogle} id="button-sign-in" variant="light"><img src="https://img.icons8.com/fluent/24/000000/google-logo.png" />     Continue with Google</Button>

          </Col>
        </Row>
      </Container>
    </>
  );
}
