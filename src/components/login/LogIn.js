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

  function refreshPage() {
    window.location.reload(false);
}

  const loginGoogle = () => {
    signInWithGoogle()
    .then(() => refreshPage())
  }


  return (

    <>
      <Container >
        <Row className="justify-content-md-center">
          <Col className="m-2" md={6}>
            <div className="center">
              <Image id="login-brand" src='https://fontmeme.com/permalink/210207/255046587a9e2009d9f79ed250f070c1.png' alt="netflix-font" />
            </div>
            <h4 className="username">Sign In</h4>
            <Form onSubmit={loginSubmit} >
              <fieldset>
                <Form.Group controlId="formBasicEmail" className="mb-2" >
                  <Form.Control type="email" placeholder="Email Address" onChange={e => setEmail(e.target.value)} />
                </Form.Group>
                <Form.Group controlId="formBasicPassword">
                  <Form.Control type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />
                </Form.Group>

                <Button block type="submit" id="button-sign-in-red">Sign In</Button>

              </fieldset>
            </Form>
            <div className="space-1">
            <Button block onClick={loginGoogle} id="button-sign-in" variant="light"><img src="https://img.icons8.com/fluent/24/000000/google-logo.png" />     Continue with Google</Button>
            </div>
            <div className="space-2">
              <p>New to Ourflix? <Link to="register"> Register Here</Link>.</p>
            </div>
          </Col>
        </Row>


      </Container>
    </>
  );
}
