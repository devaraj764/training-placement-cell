import React from 'react'
import { Container, Row, Col, Form } from 'react-bootstrap'
import { Switch, Route } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import PageNotFound from '../PageNotFound'
import Footer from '../../components/helpers/Footer'

const Alumini = () => {
    return (
        <>
            <Row className="justify-content-md-center" style={{ minHeight: '100vh' }}>
                <Col sm={12} lg={8}>
                    <Container>
                        <Switch>
                            <Route exact path='/alumini' render={() => <Index />}></Route >
                            <Route exact path='/alumini/profile' render={() => <AluminiProfile />}></Route>
                            <Route path="*" render={() => <PageNotFound />} />
                        </Switch>
                    </Container>
                </Col>
            </Row>
            <Footer />
        </>
    )
}

const Index = () => {
    return (
        <>
            <Helmet>
                <title>Student Dashboard | TPC</title>
            </Helmet>
            <div style={{ marginTop: '30px' }}>
                <p style={{ fontSize: '30px', fontWeight: 'bold', margin: 0, marginBottom: '30px' }}>Alumini Registration</p>
                <Row>
                    <Col sm={12} lg={6}>
                        <Form.Group className="mb-3" controlId="formBasicName">
                            <Form.Label>Full Name</Form.Label>
                            <Form.Control type="text" placeholder="Your full name" required/>
                        </Form.Group>
                    </Col>
                    <Col sm={12} lg={6}>
                        <Form.Group className="mb-3" controlId="formBasicId">
                            <Form.Label>College</Form.Label>
                            <Form.Control type="text" placeholder="Your RGUKT ID Number" required/>
                        </Form.Group>
                    </Col>
                    <Col sm={12} lg={6}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" placeholder="Your professional Email Address" required/>
                        </Form.Group>
                    </Col>
                    <Col sm={12} lg={6}>
                        <Form.Group className="mb-3" controlId="formBasicMobile">
                            <Form.Label>Mobile Number (Optional)</Form.Label>
                            <Form.Control type="tel" placeholder="Your Mobile Number" />
                        </Form.Group>
                    </Col>
                    <Col sm={12}>
                        <Form.Group className="mb-3" controlId="formBasicMobile">
                            <Form.Label>Address (Optional)</Form.Label>
                            <Form.Control as="textarea" type="tel" placeholder="Your Address" />
                        </Form.Group>
                    </Col>
                </Row>
            </div>
        </>
    )
}

const AluminiProfile = () => {
    return (
        <></>
    )
}

export default Alumini