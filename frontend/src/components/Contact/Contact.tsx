import { Container } from 'react-bootstrap';
import NavBar from '../NavBar/NavBar';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { BsTelephone } from 'react-icons/bs';
import { BsEnvelope } from 'react-icons/bs';
import { BsGeoAlt } from 'react-icons/bs';
import './Contact.css'

function Contact() {
    return (
        <div className="Contact">
            <NavBar />
            <Container className='mt-5'>
                <Card className='shadow border-white'>
                    <Row>
                        <Col className='d-flex justify-content-center align-items-center'>
                            <div>
                                <Card.Title className='fs-1 text-center mb-4 mt-3'>Get In Touch</Card.Title>
                                <div className='contact-item text-start'>
                                    <span>
                                        <BsGeoAlt size={30} />
                                        <span> </span>al. Politechniki 123, Łódź, Poland</span>
                                </div>
                                <div className='contact-item text-start'>
                                    <span>
                                        <BsTelephone size={30} />
                                        <span> </span>(+1) 123 456 7890</span>
                                </div>
                                <div className='contact-item text-start'>
                                    <span>
                                        <BsEnvelope size={30} />
                                        <span> </span>example@gmail.com
                                    </span>
                                </div>
                            </div>
                        </Col>
                        <Col lg={6}>
                            <div className='m-5 p-5' style={{ backgroundColor: '#7D53DE' }}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="310.752" height="305.297" viewBox="0 0 310.752 305.297" style={{ width: '100%', height: '100%' }}>
                                    <path id="Icon_metro-dice" data-name="Icon metro-dice" d="M200.325,42.4H81.614c-20.4,0-37.1,15.9-37.1,35.335V190.811c0,19.434,16.694,35.335,37.1,35.335H200.325c20.4,0,37.1-15.9,37.1-35.335V77.738c0-19.434-16.694-35.335-37.1-35.335ZM96.453,197.878c-12.293,0-22.258-9.492-22.258-21.2s9.965-21.2,22.258-21.2,22.258,9.492,22.258,21.2S108.746,197.878,96.453,197.878Zm0-84.8c-12.293,0-22.258-9.492-22.258-21.2s9.965-21.2,22.258-21.2,22.258,9.492,22.258,21.2S108.746,113.073,96.453,113.073Zm44.517,42.4c-12.293,0-22.258-9.492-22.258-21.2s9.965-21.2,22.258-21.2,22.258,9.492,22.258,21.2S153.263,155.475,140.97,155.475Zm44.517,42.4c-12.293,0-22.258-9.492-22.258-21.2s9.965-21.2,22.258-21.2,22.258,9.492,22.258,21.2S197.78,197.878,185.487,197.878Zm0-84.8c-12.293,0-22.258-9.492-22.258-21.2s9.965-21.2,22.258-21.2,22.258,9.492,22.258,21.2S197.78,113.073,185.487,113.073Zm6.668-84.8C188.693,12.19,173.673,0,155.809,0H37.1C16.694,0,0,15.9,0,35.335V148.408c0,17.015,12.8,31.323,29.678,34.62V42.4c0-7.774,6.678-14.134,14.839-14.134H192.155Z" transform="translate(0 100.339) rotate(-25)" fill="#fff" />
                                </svg>

                            </div>
                        </Col>
                    </Row>
                </Card>
            </Container>

        </div>
    );
}

export default Contact;