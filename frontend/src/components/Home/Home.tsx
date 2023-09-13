import NavBar from '../NavBar/NavBar';
import Footer from '../Footer/Footer';
import diceImage from '../../assets/dice_white.avif'
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link } from "react-router-dom";
import './Home.css'

function Home() {
    return (
        <div className="Home">
            <NavBar />
            <section className='section-dsc' style={{
                backgroundImage: `url(${diceImage})`,
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                height: '94vh',
            }}>
                <h1 className='text-dsc'>Every game has a story</h1>
                <p className='p-dsc'>Discover the captivating narratives woven into every gaming experience, where imagination and gameplay unite to create unforgettable stories.</p>
                <Button href="/games" className='button-games px-4'>View games</Button>
            </section>
            <section className='featured-categories'>
                <h1 style={{
                    fontSize: '50px',
                    color: 'white',
                    fontWeight: 'bold'
                }}>Featured Categories</h1>
                <Container className='mt-5'>
                    <Row>
                        <Col lg={2} md={4} sm={6}>
                            <div>
                                <div className='circle'></div>
                                <div className='category-text'>Strategy</div>
                            </div>
                        </Col>
                        <Col lg={2} md={4} sm={6}>
                            <div>
                                <div className='circle'></div>
                                <div className='category-text'>Party</div>
                            </div>
                        </Col>
                        <Col lg={2} md={4} sm={6}>
                            <div>
                                <div className='circle'></div>
                                <div className='category-text'>Cooperative</div>
                            </div>
                        </Col>
                        <Col lg={2} md={4} sm={6}>
                            <div>
                                <div className='circle'></div>
                                <div className='category-text'>Eurogames</div>
                            </div>
                        </Col>
                        <Col lg={2} md={4} sm={6}>
                            <div>
                                <div className='circle'></div>
                                <div className='category-text'>Abstract</div>
                            </div>
                        </Col>
                        <Col lg={2} md={4} sm={6}>
                            <div>
                                <div className='circle'></div>
                                <div className='category-text'>Family</div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>
            <section className='week-highlights py-5'>
                <h1 style={{
                    fontSize: '50px',
                    fontWeight: 'bold'
                }}>This Week Highlights</h1>
                <p>Stay updated with the most exciting and noteworthy events, news, and achievements of the week in our exclusive 'This Week Highlights' roundup.</p>
                <Container className='mt-5'>
                    <Row>
                        <Col>
                            <div>
                                <img className='game-img' src="./src/assets/board_game.avif" alt="game_1" style={{ maxWidth: '100%' }} />
                                <h3 className='mt-4'>Strategy</h3>
                                <Link className='game-link' to={'/'}>See more</Link>
                            </div>
                        </Col>
                        <Col>
                            <div>
                                <img className='game-img' src="./src/assets/board_game.avif" alt="game_1" style={{ maxWidth: '100%' }} />
                                <h3 className='mt-4'>2 player games</h3>
                                <Link className='game-link' to={'/'}>See more</Link>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>
            <section className='trending-games'>
                <h1 style={{
                    fontSize: '50px',
                    color: 'white',
                    fontWeight: 'bold'
                }}>Trending Games</h1>
                <p className='trending-games-dsc'>Explore the hottest and most popular games taking the gaming world by storm in our 'Trending Games' spotlight.</p>
                <Container className='mt-5 trending-games-container'>
                    <Row>
                        <Col lg="4">
                            <div>
                                <div className='flex justify-center items-center'>
                                    <img className='game-img' src="./src/assets/board_game.avif" alt="game_1" style={{ maxWidth: '344px' }} />
                                </div>
                                <h4 className='mt-2'>Catan</h4>
                                <h5 className='shaded-text-price'>100$</h5>
                            </div>
                        </Col>
                        <Col lg="4">
                            <div>
                                <div className='flex justify-center items-center'>
                                    <img className='game-img' src="./src/assets/board_game.avif" alt="game_1" style={{ maxWidth: '344px' }} />
                                </div>
                                <h4 className='mt-2'>Splendor</h4>
                                <h5 className='shaded-text-price'>100$</h5>
                            </div>
                        </Col>
                        <Col lg="4">
                            <div>
                                <div className='flex justify-center items-center'>
                                    <img className='game-img' src="./src/assets/board_game.avif" alt="game_1" style={{ maxWidth: '344px' }} />
                                </div>
                                <h4 className='mt-2'>Dixit</h4>
                                <h5 className='shaded-text-price'>100$</h5>
                            </div>
                        </Col>
                    </Row>
                </Container>
                <Button href="/games" className='button-all-games px-4 mt-4'>View All Games</Button>
            </section>
            <Footer />
        </div>
    );
}

export default Home;