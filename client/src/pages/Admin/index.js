import React, { useEffect } from 'react';
import { Row, Col, Container, Card, Image, Button } from 'react-bootstrap';
import NotificationImage from '../../assets/notification.png';
import EmailImage from '../../assets/email.png';
import ListStudents from '../../assets/customer.png';
import FeedbackImage from '../../assets/feedback.png';
import { BiExit } from 'react-icons/bi'

import { withRouter, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet'

const Admin = (props) => {

    useEffect(() => {
        if (!localStorage.getItem('admin-token')) {
            props.history.push('/admin/login');
        }
    }, []);


    return (
        <HomePage props={props} />
    );
};

const HomePage = () => {

    const logout = () => {
        localStorage.removeItem('admin-token');
        window.location.reload();
    }

    return (
        <>
            <Helmet>
                <title>Admin Dashboard | TPC</title>
            </Helmet>
            <Container className='Admin' style={{ marginTop: '50px' }}>
                <Row className='justify-content-md-center'>
                    <Col xs="12" lg="8">
                        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                            <p style={{ fontSize: '28px', fontWeight: 'bold', marginLeft: '20px' }}>Admin Dashboard</p>
                            <Button style={{ background: 'tomato' }} onClick={logout}><BiExit size={20} />&nbsp;Logout</Button>
                        </div>
                        <Row style={{ marginTop: '30px' }} className="gx-2">
                            <Col md={6} sm={12} className="p-3">
                                <Card body as={Link} to='/admin/dashboard/send-notification'>
                                    <Row className="inernal-row">
                                        <Col xs={2} className="align-self-center">
                                            <Image src={NotificationImage} alt="notification image" fluid style={{ maxHeight: '40px' }} />
                                        </Col>
                                        <Col xs={10} className="align-self-center">
                                            <p className="heading">Send Notifications</p>
                                            <p className="sub-heading">Admin can send notification directly to the student dahboard.</p>
                                        </Col>
                                    </Row>
                                </Card>
                            </Col>
                            <Col md={6} sm={12} className="p-3">
                                <Card body as={Link} to='/admin/dashboard/send-mail'>
                                    <Row className="inernal-row">
                                        <Col xs={2} className="align-self-center">
                                            <Image src={EmailImage} alt="notification image" fluid style={{ maxWidth: '40px' }} />
                                        </Col>
                                        <Col xs={10} className="align-self-center">
                                            <p className="heading">Send Email</p>
                                            <p className="sub-heading">Admin can send emails to the students selectively.</p>
                                        </Col>
                                    </Row>
                                </Card>
                            </Col>
                            <Col md={6} sm={12} className="p-3">
                                <Card body as={Link} to='/admin/dashboard/studentslist'>
                                    <Row className="inernal-row">
                                        <Col xs={2} className="align-self-center">
                                            <Image src={ListStudents} alt="notification image" fluid style={{ maxWidth: '40px' }} />
                                        </Col>
                                        <Col xs={10} className="align-self-center">
                                            <p className="heading">Students List</p>
                                            <p className="sub-heading">Admin can get the students lists and can apply filters.</p>
                                        </Col>
                                    </Row>
                                </Card>
                            </Col>
                            <Col md={6} sm={12} className="p-3">
                                <Card body as={Link} to='/admin/dashboard/feedbacks'>
                                    <Row className="inernal-row">
                                        <Col xs={2} className="align-self-center">
                                            <Image src={FeedbackImage} alt="notification image" fluid style={{ maxWidth: '40px' }} />
                                        </Col>
                                        <Col xs={10} className="align-self-center">
                                            <p className="heading">Student Feedbacks</p>
                                            <p className="sub-heading">See the feedbacks of the students recieved through website.</p>
                                        </Col>
                                    </Row>
                                </Card>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Container >
        </>
    )
}

export default withRouter(Admin);