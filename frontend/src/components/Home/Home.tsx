import NavBar from '../NavBar/NavBar';
import Footer from '../Footer/Footer';
import diceImage from '../../assets/dice_white.avif'
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './Home.css'
import React, {useState} from "react";
import {Api} from "../../connector/api";
import {Tag} from "../../model/game/tag";
import {AiFillTags} from "react-icons/ai";
import {Game} from "../../model/game/game";
import toast, {Toaster} from "react-hot-toast";
import {useTranslation} from "react-i18next";

function Home() {
    const { t } = useTranslation();

    const maxTags = 6;
    const [tags, setTags] = useState<Tag[]>([]);
    const [games, setGames] = useState<Game[]>([]);

    React.useEffect(() => {
        Api.game.getAllTags().then((tags) => {
            setTags(tags);
        }).catch((err) => {
            toast.error(`${err.response.data.message}`, { icon: "💀" })
        });
        Api.order.getTrendingGames().then((games) => {
            setGames(games);
        }).catch((err) => {
            toast.error(`${err.response.data.message}`, { icon: "💀" })
        });
    }, []);

    return (
        <div className="Home">
            <NavBar />
            <Toaster />
            <section className='section-dsc' style={{
                backgroundImage: `url(${diceImage})`,
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                height: '94vh',
            }}>
                <h1 className='text-dsc'>{t('Evert game has a story')}</h1>
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
                        {tags.slice(0, maxTags).map((tag, index) => (
                            <Col lg={2} md={4} sm={6} key={index}>
                                <div>
                                    <div className='circle items-center'>
                                        <AiFillTags size={45} />
                                    </div>
                                    <div className='category-text'>{tag.name}</div>
                                </div>
                            </Col>
                        ))}
                    </Row>
                    <span className='mt-4 category-text'>And more...</span>
                </Container>
            </section>
            <section className='week-highlights py-5'>
                <h1 style={{
                    fontSize: '50px',
                    fontWeight: 'bold'
                }}>Trending Games</h1>
                <p>Explore the hottest and most popular games taking the gaming world by storm in our 'Trending Games' spotlight.</p>
                <Container className='mt-5 trending-games-container'>
                    <Row>
                        {games.map((game, index) => (
                            <Col lg="4" key={index}>
                                <div>
                                    <div className='flex justify-center items-center'>
                                        <img className='game-img' src={Api.image.getImageUrl(game.imageIds[0])} alt={`game_image_${index}`} style={{ maxWidth: '344px' }} />
                                    </div>
                                    <h4 className='mt-2'>{game.title}</h4>
                                    <h5 className='shaded-text-price'>{game.price}{game.currency}</h5>
                                </div>
                            </Col>
                        ))}
                    </Row>
                </Container>
                <Button href="/games" className='all-down-button px-4 mt-4'>View All Games</Button>
            </section>
            <section className='trending-games'>
                <h1 style={{
                    fontSize: '50px',
                    color: 'white',
                    fontWeight: 'bold'
                }}></h1>
            </section>
            <Footer />
        </div>
    );
}

export default Home;