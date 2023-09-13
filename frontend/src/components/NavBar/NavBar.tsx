import React from "react";
import './NavBar.css';
import { Navbar, Container, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

export const NavBar = () => {
    const location = useLocation();
    return (
        <Navbar style={{ backgroundColor: 'white' }} sticky="top" expand="lg">
            <Container className='justify-content-start'>
                <Navbar.Toggle className='' aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav variant="underline" activeKey={location.pathname}>
                        <Nav.Item>
                            <Nav.Link as={Link} to="/" eventKey="/">Home</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link as={Link} to="/games" eventKey="/games">Games</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link as={Link} to="/about" eventKey="/about">About</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link as={Link} to="/contact" eventKey="/contact">Contact</Nav.Link>
                        </Nav.Item>
                    </Nav>
                    <Nav className="justify-content-end pe-5 flex-grow-1">
                        <Nav.Item>
                            <Navbar.Brand className="nav-brand fs-4 fw-semibold" href="/">Game Board Designer</Navbar.Brand>
                        </Nav.Item>
                    </Nav>
                    <Nav className="justify-content-end flex-grow-1" variant="pills" defaultActiveKey="/login">
                        <Nav.Item>
                            <Nav.Link className="nav-button px-5 fw-semibold" href="/login">Sign In</Nav.Link>
                        </Nav.Item>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default NavBar;