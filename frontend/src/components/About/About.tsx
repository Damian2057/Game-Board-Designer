import NavBar from '../NavBar/NavBar';
import Footer from '../Footer/Footer';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './About.css'
import React, {useState} from "react";
import {Information} from "../../model/information/information";
import {Api} from "../../connector/api";
import toast, {Toaster} from "react-hot-toast";
import {useTranslation} from "react-i18next";

function About() {

    const { t } = useTranslation();
    const [information, setInformation] = useState({} as Information);

    React.useEffect(() => {
        Api.information.getInformation().then(res => {
            setInformation(res)
        }).catch(err => {
            toast.error(`${err.response.data.message}`, { icon: "💀" })
        })
    }, [])

    return (
        <div className="About">
            <NavBar />
            <Toaster />
            <section className='about-section' style={{
                height: '94vh',
            }}>
                <h1 className='about-text-dsc'>{t('About Us')}</h1>
                <p className='p-about-dsc'>{information.about}</p>
            </section>
            <section className='mission-section'>
                <Row className='mx-0'>
                    <Col lg={6} className='mission-col'>
                        <div className='text-center mt-5 mission-dsc'>
                            <h1 className='fw-bold' style={{ fontSize: '50px' }}>{t('Our Mission')}</h1>
                            <p className='fs-5 text-muted px-5 mt-5'>{information.mission}</p>
                        </div>
                    </Col>
                    <Col lg={6}>
                        <img src="/src/assets/logo_GBD.png" alt="Game Board Designer logo" style={{ maxWidth: '100%' }} />
                    </Col>
                </Row>
            </section>
            <hr className='my-0' />
            <Footer />
        </div>
    );
}

export default About;