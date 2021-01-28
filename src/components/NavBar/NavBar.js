import {FaSearch} from "react-icons/fa";
import React from "react";
import { Image, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../scss/_navBar.scss"
import prof from "../../images/Caro.png"

export const NavBar = props => {
    return (
        <>
            <Navbar expand="lg" bg="transparent" id="navbar-container">
                <Navbar.Brand>
                    <img src="https://fontmeme.com/permalink/210127/9162a5835f5b4c9cf29e6e2d37f7519c.png" alt="netflix-font" border="0" />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
                    <Nav className="mr-auto">
                        <Nav.Item>
                            <h4>Home</h4>
                        </Nav.Item>
                        <Nav.Item>
                            <h4>Movies</h4>
                        </Nav.Item>
                        <Nav.Item>
                            <h4>TV Shows</h4>
                        </Nav.Item>
                    </Nav>
                    <Nav defaultActiveKey="/">
                        <Nav.Item>
                            <FaSearch size="1em" color="white"/>
                        </Nav.Item>
                        <Nav.Item>
                            <h4>Friends</h4>
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
