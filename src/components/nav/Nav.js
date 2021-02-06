import React, { useEffect, useState } from "react";
import { Image, Nav, Navbar } from "react-bootstrap";
import "../scss/_navBar.scss"
import { GetOneUser, getOneUserAlt } from "../../modules/APICalls";

export const NavBar = () => {

    const [user, setUser] = useState({})

    useEffect(() => {
        getOneUserAlt(JSON.parse(sessionStorage.getItem("active_user")).uid)
            .then((response) => {
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
                    <Nav.Link href="/">
                        <Image id="nav-brand" src="https://fontmeme.com/permalink/210127/9162a5835f5b4c9cf29e6e2d37f7519c.png" alt="netflix-font" />
                    </Nav.Link>
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
                            <Nav.Link href={`user/details/${user.fbid}`}>
                                <Image src={user.photoURL} alt="your profile picture" id="prof-pic" />
                            </Nav.Link>
                        </Nav.Item>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </>
    );
};
