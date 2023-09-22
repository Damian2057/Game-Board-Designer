import React, {useState} from "react";
import {Api} from "../../../connector/api";
import toast, {Toaster} from "react-hot-toast";
import NavBar from "../../NavBar/NavBar";
import {Container} from "react-bootstrap";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import {BsEnvelope, BsTelephone} from "react-icons/bs";
import {PiUserListBold} from "react-icons/pi";
import {RiLockPasswordFill} from "react-icons/ri";
import Button from "react-bootstrap/Button";

function MyOrders() {

    const [user, setUser] = useState({} as any);
    const [username, setUsername] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    const updateData = () => {
        let name = username != user.username ? username : null;
        let phone = phoneNumber != user.phoneNumber ? phoneNumber : null;
        let mail = email != user.email ? email : null;
        let pass = password != '' ? password : null;
        Api.user.selfUpdate(name, phone, mail, pass).then(() => {
            toast.success('Successfully updated!', { icon: "👋" });
        }).catch(err => {
            toast.error(`${err.response.data.message}`, { icon: "💀" })
        });
    };

    React.useEffect(() => {
        Api.user.getSelf().then(res => {
            setUser(res)
            setUsername(res.username);
            setPhoneNumber(res.phoneNumber);
            setEmail(res.email);
            setPassword('')
        }).catch(err => {
            toast.error(`${err.response.data.message}`, { icon: "💀" })
        })
    }, [])

    return (
        <div className="MyOrders">
            <NavBar />
            <Toaster />
            <Container className='mt-5'>
                <Card className='shadow border-white'>
                    <Row>
                        <Col className='d-flex justify-content-center align-items-center'>
                            <div>
                                <Card.Title className='fs-1 text-center mb-4 mt-3'>User Data</Card.Title>
                                <Form>
                                    <div className='contact-item text-start'>
                                        <div className='flex flex-row gap-2 items-center'>
                                            <div>
                                                <BsEnvelope size={30} />
                                            </div>
                                            <div>
                                                Email
                                            </div>
                                        </div>
                                        <div className="mt-2">
                                            <Form.Control type='text' placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)}/>
                                        </div>
                                    </div>
                                    <div className='contact-item text-start'>
                                        <div className='flex flex-row gap-2 items-center'>
                                            <div>
                                                <BsTelephone size={30} />
                                            </div>
                                            <div>
                                                PhoneNumber
                                            </div>
                                        </div>
                                        <div className="mt-2">
                                            <Form.Control type='text' placeholder='phoneNumber' value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)}/>
                                        </div>
                                    </div>
                                    <div className='contact-item text-start'>
                                        <div className='flex flex-row gap-2 items-center'>
                                            <div>
                                                <PiUserListBold size={30} />
                                            </div>
                                            <div>
                                                UserName
                                            </div>
                                        </div>
                                        <div className="mt-2">
                                            <Form.Control type='text' placeholder='username' value={username} onChange={(e) => setUsername(e.target.value)}/>
                                        </div>
                                    </div>
                                    <div className='contact-item text-start'>
                                        <div className='flex flex-row gap-2 items-center'>
                                            <div>
                                                <RiLockPasswordFill size={30} />
                                            </div>
                                            <div>
                                                Password
                                            </div>
                                        </div>
                                        <div className="mt-2">
                                            <Form.Control type='password' value='' onChange={(e) => setPassword(e.target.value)}/>
                                        </div>
                                    </div>
                                    <Col lg={10} xs={10} className='mx-auto mb-5'>
                                        <Button type="button" className='register-button' onClick={updateData}>
                                            Save Data
                                        </Button>
                                    </Col>
                                </Form>
                            </div>
                        </Col>
                        <Col lg={6}>
                            <div className='m-5 p-5' style={{ backgroundColor: '#7D53DE' }}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                     className="bi bi-person-square" viewBox="0 0 16 16" style={{ width: '100%', height: '100%', color: "white" }}>
                                    <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
                                    <path
                                        d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm12 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1v-1c0-1-1-4-6-4s-6 3-6 4v1a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12z"/>
                                </svg>
                            </div>
                        </Col>
                    </Row>
                </Card>
            </Container>

        </div>
    );
}

export default MyOrders;