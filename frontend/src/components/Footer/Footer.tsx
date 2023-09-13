import React from "react"
import { Link } from "react-router-dom";
import './Footer.css';

const Footer = () =>
    <div className="footer pt-4 ">
        <div className="container-fluid text-center text-md-left">
            <div className="row">
                <div className="col-md-8 col-lg-7 mt-md-0 mt-3 mb-3">
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <span>
                            <img src="/src/assets/logo_GBD.png" alt="Game Board Designer logo" height={'140px'} style={{ maxHeight: '140px' }} />
                        </span>
                        <h3 className="footer-logo-name text-uppercase fw-bolder" style={{ marginLeft: '10px' }}>
                            Game Board Designer
                        </h3>
                    </div>
                    <p className="footer-description">"Unleash the thrill of gaming with Board Game Designer – where passion meets play! Our dedicated team delivers unforgettable adventures, one board game at a time."</p>
                </div>

                <hr className="w-100 d-md-none pb-0" />

                <div className="col-md-2 mb-md-0 mb-3 mt-5">
                    <h4 className="text-uppercase fw-bolder footer-text">Help</h4>
                    <ul className="list-unstyled">
                        <li><Link className="footer-link" to={'/contact'}>Contact</Link></li>
                        <li><Link className="footer-link" to={'/login'}>Login</Link></li>
                        <li><Link className="footer-link" to={'/register'}>Register</Link></li>
                    </ul>
                </div>

                <div className="col-md-2 mb-md-0 mb-3 mt-5">
                    <h4 className="text-uppercase fw-bolder footer-text">Resources</h4>
                    <ul className="list-unstyled">
                        <li><Link className="footer-link" to={'/'}>Home</Link></li>
                        <li><Link className="footer-link" to={'/games'}>Games</Link></li>
                        <li><Link className="footer-link" to={'/about'}>About</Link></li>
                    </ul>
                </div>
            </div>
        </div>

    </div>

export default Footer