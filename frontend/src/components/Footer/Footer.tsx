import React from "react"
import { Link } from "react-router-dom";
import './Footer.css';
import {useTranslation} from "react-i18next";

const Footer = () => {
    const { t } = useTranslation();

    return (
        <div className="footer pt-4 ">
            <div className="container-fluid text-center text-md-left">
                <div className="row">
                    <div className="col-md-8 col-lg-7 mt-md-0 mt-3 mb-3">
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <span>
                            <img src="/src/assets/logo_GBD.png" alt="Game Board Designer logo" height={'140px'} style={{ maxHeight: '140px' }} />
                        </span>
                            <h3 className="footer-logo-name text-uppercase fw-bolder" style={{ marginLeft: '10px' }}>
                                Game Flow
                            </h3>
                        </div>
                        <p className="footer-description">{t('Footer description')}</p>
                    </div>

                    <hr className="w-100 d-md-none pb-0" />

                    <div className="col-md-2 mb-md-0 mb-3 mt-5">
                        <h4 className="text-uppercase fw-bolder footer-text">{t('HELP')}</h4>
                        <ul className="list-unstyled">
                            <li><Link className="footer-link" to={'/contact'}>{t('Contact')}</Link></li>
                            <li><Link className="footer-link" to={'/login'}>{t('Login')}</Link></li>
                            <li><Link className="footer-link" to={'/register'}>{t('Register')}</Link></li>
                        </ul>
                    </div>

                    <div className="col-md-2 mb-md-0 mb-3 mt-5">
                        <h4 className="text-uppercase fw-bolder footer-text">{t('Resources')}</h4>
                        <ul className="list-unstyled">
                            <li><Link className="footer-link" to={'/'}>{t('Home')}</Link></li>
                            <li><Link className="footer-link" to={'/games'}>{t('Games')}</Link></li>
                            <li><Link className="footer-link" to={'/about'}>{t('About')}</Link></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Footer