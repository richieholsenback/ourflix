import React, { useEffect, useState } from "react";
import { Image, Nav, Navbar } from "react-bootstrap";
import "../scss/_navBar.scss"
import prof from "../../images/Caro.png"
import { GetOneUser, getOneUserAlt, getUsers } from "../../modules/APICalls";
import { useHistory, useParams } from "react-router-dom";
import firebase from "firebase/app";

export const NavBar = () => {

    const [user, setUser] = useState({})
    const [userArray, setUserArray] = useState({})
    const history = useHistory();
    const { fbid } = useParams();

    useEffect(() => {
        console.log(JSON.parse(sessionStorage.getItem("active_user")).uid)
        getOneUserAlt(JSON.parse(sessionStorage.getItem("active_user")).uid)
            .then((response) => {
                console.log(Object.keys(response))
                GetOneUser(Object.keys(response))
                .then(response => {
                    setUser(response)
                })
            })
    }, [])
    
    return (
        <>
            <Navbar expand="lg" bg="transparent" id="navbar-container" variant="dark">
                <Navbar.Brand>
                    <Image id="nav-brand" src="https://fontmeme.com/permalink/210127/9162a5835f5b4c9cf29e6e2d37f7519c.png" alt="netflix-font" />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end" >
                    <Nav className="mr-auto" id="nav-left">
                        <Nav.Item>
                            <Nav.Link href="/">Home</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link href="/movies">Movies</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link href="/shows">TV Shows</Nav.Link>
                        </Nav.Item>
                    </Nav>
                    <Nav id="nav-right" >
                       <Nav.Item>
                            <Nav.Link href="/friends">Friends</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <img src={user.photoURL} id="prof-pic"/>
                        </Nav.Item>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </>
    );
};
