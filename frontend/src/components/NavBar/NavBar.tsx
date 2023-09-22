import React from "react";
import './NavBar.css';
import { Navbar, Container, Nav } from "react-bootstrap";
import {Link, useLocation} from "react-router-dom";
import {Api} from "../../connector/api";
import {PiUserListBold} from "react-icons/pi";
import {FaRegUserCircle} from "react-icons/fa";
import {TbLayoutDashboard} from "react-icons/tb";
import {FiShoppingCart} from "react-icons/fi";

export const NavBar = () => {

    const location = useLocation();

    const isUserLoggedIn: boolean = !!Api.auth.getAuthToken();
    const linkText = isUserLoggedIn ? 'Sign Out' : 'Sign In';
    const linkPath = isUserLoggedIn ? '/' : '/login';

    const isEmployee: boolean = Api.auth.isEmployee();

    const handleSignOut = () => {
        Api.auth.removeData();
        window.location.reload();
    }

    const noop = () => {};

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
                        {isUserLoggedIn && (
                            <Nav.Item>
                                <Nav.Link as={Link} to="/profile" eventKey="/profile">
                                    <FaRegUserCircle size={24} />
                                </Nav.Link>
                            </Nav.Item>
                        )}
                        {isUserLoggedIn && (
                            <Nav.Item>
                                <Nav.Link as={Link} to="/my-orders" eventKey="/my-orders">
                                    <FiShoppingCart size={24} />
                                </Nav.Link>
                            </Nav.Item>
                        )}
                    </Nav>
                    <Nav className="justify-content-end pe-5 flex-grow-1">
                        <Nav.Item>
                            <Navbar.Brand className="nav-brand fs-4 fw-semibold" href="/">Game Flow</Navbar.Brand>
                        </Nav.Item>
                    </Nav>
                    <Nav className="justify-content-end flex-grow-1" variant="pills" defaultActiveKey="/login">
                        <Nav.Item>
                            <Nav.Link className="nav-button px-5 fw-semibold" href={linkPath} onClick={isUserLoggedIn ? handleSignOut : noop}>{linkText}</Nav.Link>
                        </Nav.Item>
                        {isEmployee && (
                            <Nav.Item>
                                <Nav.Link as={Link} to={Api.auth.isAdmin() ? '/panel/admin' : '/panel/employee'} className="fw-semibold">
                                    <div className='flex flex-row items-center'>
                                   <div>
                                       <TbLayoutDashboard size={30} />
                                   </div>
                                   <div>
                                       DashBoard
                                   </div>
                                    </div>
                                </Nav.Link>
                            </Nav.Item>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default NavBar;