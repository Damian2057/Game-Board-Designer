import {Col, Container, Row} from "react-bootstrap";
import React, {useState} from "react";
import {Api} from "../../../connector/api";
import toast, {Toaster} from "react-hot-toast";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import {BsTelephone} from "react-icons/bs";
import {PiUserListBold} from "react-icons/pi";
import Button from "react-bootstrap/Button";
import IconCircle from "../../util/IconCircle";
import {FaAddressBook} from "react-icons/fa";
import {AiFillFacebook} from "react-icons/ai";
import {FcAbout, FcTodoList} from "react-icons/fc";
import {t} from "i18next";

function CustomOptionPanel() {

    const [address, setAddress] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [email, setEmail] = useState('');
    const [about, setAbout] = useState('');
    const [mission, setMission] = useState('');
    const [facebook, setFacebook] = useState('');

    React.useEffect(() => {
        fetchData();
    }, []);

    const fetchData = () => {
        Api.information.getInformation().then(res => {
            setAddress(res.address);
            setPhoneNumber(res.phoneNumber);
            setEmail(res.email);
            setAbout(res.about);
            setMission(res.mission);
            setFacebook(res.facebook);
        }).catch(err => {
            toast.error(`${err.response.data.message}`, { icon: "💀" })
        });
    }

    const updateData = () => {
        Api.information.updateInformation({
            address: address,
            phoneNumber: phoneNumber,
            email: email,
            about: about,
            mission: mission,
            facebook: facebook
        }).then(() => {
            toast.success(t("Successfully updated"), { icon: "👋" });
            fetchData();
        }).catch(err => {
            toast.error(`${err.response.data.message}`, { icon: "💀" })
        });
    }

    return (
        <div style={{ backgroundColor: '#7D53DE', height: '100vh' }}>
            <Toaster />
            <Container>
                <Card className='shadow border-white' style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '70%',
                }}>
                    <Card.Body>
                        <IconCircle path={'/panel/admin'} />
                        <p className='font-bold fs-2'>{t("Options")}</p>
                    </Card.Body>
                    <Row>
                        <Col className='d-flex justify-content-center align-items-start'>
                            <div>
                                <Form>
                                    <div className='contact-item text-start'>
                                        <div className='flex flex-row gap-2 items-center'>
                                            <div>
                                                <FaAddressBook size={30} />
                                            </div>
                                            <div>
                                                {t("address")}
                                            </div>
                                        </div>
                                        <div className="mt-2">
                                            <Form.Control type='text' placeholder='Address' value={address} onChange={(e) => setEmail(e.target.value)}/>
                                        </div>
                                    </div>
                                    <div className='contact-item text-start'>
                                        <div className='flex flex-row gap-2 items-center'>
                                            <div>
                                                <BsTelephone size={30} />
                                            </div>
                                            <div>
                                                {t("Phone")}
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
                                                {t("Email")}
                                            </div>
                                        </div>
                                        <div className="mt-2">
                                            <Form.Control type='text' placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)}/>
                                        </div>
                                    </div>
                                    <div className='contact-item text-start'>
                                        <div className='flex flex-row gap-2 items-center'>
                                            <div>
                                                <AiFillFacebook size={30} />
                                            </div>
                                            <div>
                                                Facebook
                                            </div>
                                        </div>
                                        <div className="mt-2">
                                            <Form.Control type='text' placeholder='Facebook' value={facebook} onChange={(e) => setFacebook(e.target.value)}/>
                                        </div>
                                    </div>
                                </Form>
                            </div>
                        </Col>
                        <Col className='d-flex justify-content-center align-items-start'>
                            <div>
                                <Form>
                                    <div className='contact-item text-start'>
                                        <div className='flex flex-row gap-2 items-center'>
                                            <div>
                                                <FcAbout size={30} />
                                            </div>
                                            <div>
                                                {t("About Us")}
                                            </div>
                                        </div>
                                        <div className="mt-2">
                                            <Form.Control
                                                as="textarea"
                                                value={about || ''}
                                                style={{ height: '150px', margin: '1rem 0' }}
                                                onChange={(e) => setAbout(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    <div className='contact-item text-start'>
                                        <div className='flex flex-row gap-2 items-center'>
                                            <div>
                                                <FcTodoList size={30} />
                                            </div>
                                            <div>
                                                {t("Our Mission")}
                                            </div>
                                        </div>
                                        <div className="mt-2">
                                            <Form.Control
                                                as="textarea"
                                                value={mission || ''}
                                                style={{ height: '150px', margin: '1rem 0' }}
                                                onChange={(e) => setMission(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    <Col lg={10} xs={10} className='mx-auto mb-5'>
                                        <Button type="button" className='register-button' onClick={updateData}>
                                            {t("Save Data")}
                                        </Button>
                                    </Col>
                                </Form>
                            </div>

                        </Col>
                        <Col lg={6}>
                            <div className='m-5 p-5' style={{ backgroundColor: '#7D53DE' }}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                     className="bi bi-bezier2" viewBox="0 0 16 16" style={{ width: '100%', height: '100%', color: "white" }}>
                                    <path fillRule="evenodd"
                                          d="M1 2.5A1.5 1.5 0 0 1 2.5 1h1A1.5 1.5 0 0 1 5 2.5h4.134a1 1 0 1 1 0 1h-2.01c.18.18.34.381.484.605.638.992.892 2.354.892 3.895 0 1.993.257 3.092.713 3.7.356.476.895.721 1.787.784A1.5 1.5 0 0 1 12.5 11h1a1.5 1.5 0 0 1 1.5 1.5v1a1.5 1.5 0 0 1-1.5 1.5h-1a1.5 1.5 0 0 1-1.5-1.5H6.866a1 1 0 1 1 0-1h1.711a2.839 2.839 0 0 1-.165-.2C7.743 11.407 7.5 10.007 7.5 8c0-1.46-.246-2.597-.733-3.355-.39-.605-.952-1-1.767-1.112A1.5 1.5 0 0 1 3.5 5h-1A1.5 1.5 0 0 1 1 3.5v-1zM2.5 2a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1zm10 10a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1z"/>
                                </svg>
                            </div>
                        </Col>
                    </Row>
                </Card>
            </Container>
        </div>
    )
}

export default CustomOptionPanel;