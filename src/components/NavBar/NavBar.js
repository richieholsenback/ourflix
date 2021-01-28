import {FaSearch} from "react-icons/fa";
import React from "react";
import { Image, Nav, Navbar } from "react-bootstrap";
import "../scss/_navBar.scss"
import prof from "../../images/Caro.png"

export const NavBar = props => {
    return (
        <>
            <Navbar expand="lg" bg="transparent" id="navbar-container">
                <Navbar.Brand>
                    <Image id="nav-brand" src="https://fontmeme.com/permalink/210127/9162a5835f5b4c9cf29e6e2d37f7519c.png" alt="netflix-font" />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
                    <Nav className="mr-auto" id="nav-left">
                        <Nav.Item>
                            <Nav.Link>Home</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link>Movies</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link>TV Shows</Nav.Link>
                        </Nav.Item>
                    </Nav>
                    <Nav id="nav-right">
                        <Nav.Item>
                            <FaSearch size="1em" color="white"/>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link>Friends</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Image src={prof} id="prof-pic"/>
                        </Nav.Item>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </>
    );
};
