import React, { useState, useContext } from "react";
import { Button, Form, Container, Row, Col } from 'react-bootstrap';
import { useHistory, Link } from "react-router-dom";
import { FirebaseContext } from "../fbAuth/FirebaseProvider";

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
      .then(response => history.push("/"))
  }


  return (

    <>
    <Container fluid="xl">
      <Row>
        <Col className="m-2" md={6}>
        <h5 className="username">Please sign in.</h5>
        <Form onSubmit={loginSubmit} >
          <fieldset>
            <Form.Group controlId="formBasicEmail" className="mb-2">
              <Form.Control type="email" placeholder="Email Address" onChange={e => setEmail(e.target.value)} />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Control type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />
            </Form.Group>

            <Button variant="primary" type="submit">Sign In</Button>
            
          </fieldset>
        </Form>
      </Col>

        <Col className="m-2">
        <h5 className="username">
            Need an account? 
        </h5>
          <Link to="register" className="btn btn-block btn-outline-success">Create one with your email</Link>
          <Button block onClick={loginGoogle} variant="outline-success">Continue with Google</Button>
         
       </Col>
      </Row>
      </Container>
    </>
  );
}
