import React, { useEffect, useState } from "react";
import { Image, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom"
import "../scss/navBar.scss"
import firebase from "firebase/app";
import { GetOneUser, getOneUserAlt } from "../../modules/APICalls";
import { IoLogOutOutline } from "react-icons/io5";

export const NavBar = () => {

    const [user, setUser] = useState({})

    const activeUser = JSON.parse(sessionStorage.getItem("active_user"))

    useEffect(() => {
        getOneUserAlt(firebase.auth().currentUser.uid)
            .then(response => {
                const result = Object.keys(response)
                GetOneUser(result)
                    .then(response => {
                        setUser(response)
                    })
            })
    }, [])

    function refreshPage() {
        window.location.reload(false);
    }

    return (
        <>
            <Navbar expand="lg" bg="transparent" id="navbar-container" variant="dark">
                <Navbar.Brand>
                    <Nav.Link href="/">
                        <Image id="nav-brand" src="https://fontmeme.com/permalink/210127/9162a5835f5b4c9cf29e6e2d37f7519c.png" alt="netflix-font" />
                    </Nav.Link>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end" >
                    <Nav className="mr-auto" id="nav-left">
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
                        {/* <Nav.Item>
                            <Nav.Link href="/groups">Groups</Nav.Link>
                        </Nav.Item> */}
                        <Nav.Item>
                            <Nav.Link href={`/myprofile/${firebase.auth().currentUser.uid}`}>
                                {console.log(activeUser)}
                                <Image id="prof-pic" src={firebase.auth().currentUser.photoURL} />
                                {/* Home */}
                            </Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link onClick={() => {
                                sessionStorage.clear()
                            }}
                                href="/login">
                                <h4 className="navtext"><IoLogOutOutline color="white" size="2em"/></h4>
                            </Nav.Link>
                        </Nav.Item>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </>
    );
};
