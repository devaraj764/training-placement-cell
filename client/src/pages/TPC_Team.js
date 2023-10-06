import React from 'react';
import { Row, Col, Container, Card, Image } from 'react-bootstrap';
import DevaImage from '../assets/deva.jpg';
import TarunImage from '../assets/tarun.jpg';
import { Helmet } from 'react-helmet'

const TPC_Team = () => {
    return (
        <div className="TPC_Team">
            <Container>
                <Helmet>
                    <title>Techinical Team | TPC</title>
                </Helmet>
                <Row className="justify-content-md-center" style={{ minHeight: '100vh' }}>
                    <Col sm={12} md={8} className="align-self-center">
                        <p style={{ fontSize: '22px', fontWeight: 'bold', textAlign: 'center', marginTop:'30px' }}>TPC Techincal Team</p>
                        <Card body>
                            <Row>
                                <Col md={4} sm={12}>
                                    <Image src={DevaImage} fluid />
                                </Col>
                                <Col md={8} sm={12}>
                                    <p className='heading'>Deva Raju</p>
                                    <p className='sub-heading'>UI/UX Designer, Full Stack Developer</p>
                                    <br />
                                    <p className='sub-heading' style={{ color: '#3c4852' }}>Contact :</p>
                                    <p>Rajiv Gandhi University of Knowledge Technologies Srikakulam</p>
                                    <p>Email: <i>mdevaraju764@gmail.com</i></p>
                                    <p>Mobile: <i>+91 7013240218</i></p>
                                </Col>
                            </Row>
                        </Card>
                        <Card body>
                            <Row>
                                <Col md={4} sm={12}>
                                    <Image src={TarunImage} fluid />
                                </Col>
                                <Col md={8} sm={12}>
                                    <p className='heading'>Tarun Babu</p>
                                    <p className='sub-heading'>Full Stack Developer, Flutter Developer</p>
                                    <br />
                                    <p className='sub-heading' style={{ color: '#3c4852' }}>Contact :</p>
                                    <p>Rajiv Gandhi University of Knowledge Technologies Srikakulam</p>
                                    <p>Email: <i>tarunbabu856@gmail.com</i></p>
                                    <p>Mobile: <i>+91 6300145448</i></p>
                                </Col>
                            </Row>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default TPC_Team