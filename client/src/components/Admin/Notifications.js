import React, { useState, useEffect } from 'react';
import { Form, Button, Row, Col, Container, Image, Spinner } from 'react-bootstrap'
import { BsPatchCheckFill } from 'react-icons/bs';
import Toast from '../../components/helpers/Toast';
import axios from '../../axios';
import NotificationImage from '../../assets/notification.png';
import { withRouter } from 'react-router-dom';
import { Helmet } from 'react-helmet'

const Notifications = (props) => {
    const [title, settitle] = useState('');
    const [description, setdescription] = useState('');
    const [type, settype] = useState('');
    const [externals, setexternals] = useState('');
    const [toast, settoast] = useState(false);
    const [sendMail, setsendMail] = useState(false);
    const [loader, setloader] = useState(false);

    useEffect(() => {
        if (!localStorage.getItem('admin-token')) {
            props.history.push('/admin/login');
        }
    }, []);

    const sendNotification = (e) => {
        e.preventDefault();
        if (title === '' || description === '' || type === '') {
            alert('Please fill out all fields');
            return;
        }
        setloader(true);
        const url = '/admin/notifications'
        axios.post(url, {
            "title": title,
            "description": description,
            "type": type,
            "externals": externals
        }, {
            headers: {
                "auth-token": localStorage.getItem('admin-token')
            }
        })
            .then((res) => {
                if (sendMail) {
                    sendMails()
                } else {
                    settoast(true);
                    setloader(false);
                }
                settitle('')
                setdescription('')
                settype('')
                setexternals('')
            })
            .catch((err) => { console.log(err); setloader(false) })
    }

    const sendMails = () => {
        let emails = [];
        axios.post('/admin/getStudents', {
            "reqparams": "email"
        }, {
            headers: {
                "auth-token": localStorage.getItem('admin-token')
            }
        })
            .then((res) => {
                res.data.map((data) => emails.push(data.email))
                axios.post('/admin/sendmail', {
                    subject: title,
                    html: description,
                    emails: emails
                }, {
                    headers: {
                        "auth-token": localStorage.getItem("admin-token")
                    }
                })
                    .then((res) => { setsendMail(false); settoast(true); setloader(false); })
                    .catch((err) => console.log(err))
            })
            .catch((err) => console.log(err))
    }


    return (
        <>
            <Helmet>
                <title>Send Notification | Admin</title>
            </Helmet>
            <Container className='Admin' style={{ marginTop: '50px' }}>
                <Row className='justify-content-md-center'>
                    <Col xs="12" lg="8">
                        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '50px' }}>
                            <div style={{ marginRight: '20px' }}>
                                <Image src={NotificationImage} alt="notification image" fluid style={{ maxHeight: '60px' }} />
                            </div>
                            <div>
                                <p className="heading">Send Notifications</p>
                                <p className="sub-heading">Admin can send notification directly to the student dahboard.</p>
                            </div>
                        </div>
                        <div style={{ border: '1px solid #c8c8c8', padding: '20px', borderRadius: '10px', height: 'fit-content' }}>
                            <Form>
                                <Form.Group>
                                    <Form.Label>Title</Form.Label>
                                    <Form.Control type="text" placeholder='Enter title of notification' value={title} onChange={(e) => settitle(e.target.value)} required />
                                </Form.Group><br />
                                <Form.Group>
                                    <Form.Label>Description</Form.Label>
                                    <Form.Control as="textarea" rows="3" type="text" placeholder='Enter description of notification' value={description} onChange={(e) => setdescription(e.target.value)} required />
                                </Form.Group><br />
                                <Row>
                                    <Form.Group as={Col} sm={12} lg={6}>
                                        <Form.Label>Type</Form.Label>
                                        <Form.Select defaultValue="-- select --" placeholder="Notification Type" onChange={(e) => settype(e.target.value)} required>
                                            <option disabled>-- select --</option>
                                            <option value="info">Info</option>
                                            <option value="warning">Warning</option>
                                            <option value="success">Success</option>
                                            <option value="test">Test</option>
                                        </Form.Select>
                                    </Form.Group><br />
                                    <Form.Group as={Col} sm={12} lg={6}>
                                        <Form.Label>External Links</Form.Label>
                                        <Form.Control type="text" placeholder='external links' value={externals} onChange={(e) => setexternals(e.target.value)} />
                                    </Form.Group>
                                    <Form.Group style={{ marginTop: '20px', display: 'flex' }}>
                                        <input type='checkbox' style={{ width: '20px', marginRight: '10px' }} value={sendMail} onChange={(e) => setsendMail(e.target.checked)} />
                                        <Form.Label style={{ marginTop: '14px' }}>Send Mail</Form.Label>
                                    </Form.Group>
                                </Row>
                                <Row className="justify-content-md-center" style={{ marginTop: '30px ' }}>
                                    <Col xs={12}>
                                        <Button size='lg' type='submit' variant='primary' onClick={(e) => sendNotification(e)} style={{ width: '100%' }}>{loader ? <Spinner animation="border" size='sm' /> : 'Send Notification'}</Button>
                                    </Col>
                                </Row>
                            </Form>
                        </div>
                        <Toast value={toast} callback={settoast}>
                            <BsPatchCheckFill size={18} style={{ color: '#32CD32' }} /> &nbsp; Notification Sent Successfully
                        </Toast>
                    </Col>
                </Row>
            </Container>
        </>

    )
}

export default withRouter(Notifications)