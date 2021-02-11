import React, { useState, useContext } from "react";
import { Button, Form, Container, Col, Row, Image } from 'react-bootstrap';
import { useHistory, Link } from "react-router-dom";
import { FirebaseContext } from "../fbAuth/FirebaseProvider";
import firebase from "firebase/app";

export const Register = () => {
  const history = useHistory();
  const { register } = useContext(FirebaseContext);

  const [name] = useState();
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
      <Container id="log-in-container">
        <Row className="justify-content-md-center">
          <Col className="m-2" md={6}>
            <div className="center">
              <Image id="login-brand" src='https://fontmeme.com/permalink/210207/255046587a9e2009d9f79ed250f070c1.png' alt="netflix-font" />
            </div>
            <h4 className="username">Create Your Ourflix Account</h4>
            <Form onSubmit={registerClick}>
              <fieldset>
                <Form.Group controlId="email">
                  <Form.Control type="text" placeholder="name@example.com" onChange={e => setEmail(e.target.value)} />
                  <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                </Form.Text>
                </Form.Group>
                <Form.Group controlId="password">
                  <Form.Control type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />
                </Form.Group>
                <Form.Group controlId="confirmPassword">
                  <Form.Control type="password" placeholder="Confirm password" onChange={e => setConfirmPassword(e.target.value)} />
                </Form.Group>

                <Button variant="primary" className="btn btn-block" type="submit" id="button-sign-in-red">Create your account</Button>
              </fieldset>
            </Form>
            <div className="space-1">
              <p>Already have an account? <Link to="login"> Sign In</Link>.</p>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
}