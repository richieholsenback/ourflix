import React, { useState, useContext } from "react";
import { Button, Form, Container, Col, Row } from 'react-bootstrap';
import { useHistory, Link } from "react-router-dom";
import { FirebaseContext } from "../fbAuth/FirebaseProvider";
import firebase from "firebase/app";

export const Register = () => {
  const history = useHistory();
  const { register } = useContext(FirebaseContext);

  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();

  const registerClick = (e) => {
    e.preventDefault();
    if (password && password !== confirmPassword) {
      alert("Passwords don't match. Do better.");
    } else {
      const userProfile = { name, email };
      register(userProfile, password)
        .then(() => history.push(`/user/update/${firebase.auth().currentUser.uid}`));
    }
  };

  return (
    <>
    <Container fluid="xl">
    <Row>
      <Col className="m-2" md={6}>
      <Form onSubmit={registerClick}>
              <h5 className="username">Create Your Ourflix Account</h5>
              <fieldset>

              <Form.Group controlId="email">
                <Form.Label>Email</Form.Label>
                <Form.Control type="text" placeholder="name@example.com" onChange={e => setEmail(e.target.value)} />
                <Form.Text className="text-muted">
                  We'll never share your email with anyone else.
                </Form.Text>
              </Form.Group>

              <Form.Group controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />
              </Form.Group>

              <Form.Group controlId="confirmPassword">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control type="password" placeholder="Confirm password" onChange={e => setConfirmPassword(e.target.value)} />
              </Form.Group>
              
              
              <Button variant="primary" type="submit">Continue</Button>
            </fieldset>
          </Form>
    </Col>

      <Col className="m-2">
      <h5 className="username">Already have an account?</h5>
          <Link to="/login" className="btn btn-block btn-outline-success">Sign in</Link>
       
     </Col>
    </Row>
    </Container>
  </>
  );
}