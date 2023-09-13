import NavBar from '../NavBar/NavBar';
import Footer from '../Footer/Footer';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './About.css'

function About() {
    return (
        <div className="About">
            <NavBar />
            <section className='about-section' style={{
                height: '94vh',
            }}>
                <h1 className='about-text-dsc'>About Us</h1>
                <p className='p-about-dsc'>Uncover the captivating essence of gaming greatness as we delve into the thrilling world of video games.</p>
            </section>
            <section className='mission-section'>
                <Row className='mx-0'>
                    <Col lg={6} className='mission-col'>
                        <div className='text-center mt-5 mission-dsc'>
                            <h1 className='fw-bold' style={{ fontSize: '50px' }}>Our Mission</h1>
                            <p className='fs-5 text-muted px-5 mt-5'>Embark on our inspiring journey as we strive to fulfill our mission - pushing the boundaries of innovation and
                                delivering immersive gaming experiences that captivate and delight players worldwide.</p>
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