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

    const profilePic = () => {
        if (firebase.auth().currentUser.photoURL === null){
            return <Image id="prof-pic" src="https://pro2-bar-s3-cdn-cf1.myportfolio.com/dddb0c1b4ab622854dd81280840458d3/98032aebff601c1d993e12a0_rw_600.png?h=8030f4d5734548795c22da59ca72e3e1" />
        } else {
            return <Image id="prof-pic" src={activeUser.photoURL} />
        }
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
                                {profilePic()}
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
