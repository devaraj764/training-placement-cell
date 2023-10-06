import React, { useState, useEffect } from 'react';
import { Form, Button, Row, Col, Container, Image, Spinner } from 'react-bootstrap'
import { BsPatchCheckFill } from 'react-icons/bs';
import Toast from '../../components/helpers/Toast';
import axios from '../../axios';
import EmailImage from '../../assets/email.png';
import { withRouter } from 'react-router-dom';
import { Helmet } from 'react-helmet'


const SendMail = (props) => {
    const [subject, setsubject] = useState('');
    const [body, setbody] = useState('');
    const [mails, setmails] = useState('');
    const [toast, settoast] = useState(false);
    const [loader, setloader] = useState(false);

    useEffect(() => {
        if (!localStorage.getItem('admin-token')) {
            props.history.push('/admin/login');
        }
        if (props.location.state) {
            let emails = props.history.location.state.emails
            setmails(emails)
        }
    }, []);

    const sendMail = (e) => {
        e.preventDefault()
        if (subject === '' || body === '' || mails === '') {
            alert('Please fill out all fields');
            return;
        }
        setloader(true)
        axios.post('/admin/sendmail', {
            subject: subject,
            emails: mails,
            html: body
        }, {
            headers: {
                "auth-token": localStorage.getItem("admin-token")
            }
        })
            .then((res) => {
                setloader(false)
                settoast(true);
                setsubject('')
                setbody('')
                setmails('')
            })
            .catch((err) => { console.log(err); setloader(false) })
    }

    return (
        <>
            <Helmet>
                <title>Send Mail | Admin</title>
            </Helmet>
            <Container className='Admin' style={{ marginTop: '50px' }}>
                <Row className='justify-content-md-center'>
                    <Col xs="12" lg="8">
                        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '50px' }}>
                            <div style={{ marginRight: '20px' }}>
                                <Image src={EmailImage} alt="email image" fluid style={{ maxHeight: '60px' }} />
                            </div>
                            <div>
                                <p className="heading">Send Email</p>
                                <p className="sub-heading">Admin can send emails to the students selectively.</p>
                            </div>
                        </div>
                        <div style={{ border: '1px solid #c8c8c8', padding: '20px', borderRadius: '10px', height: 'fit-content' }}>
                            <Form>
                                <Form.Group>
                                    <Form.Label>Subject</Form.Label>
                                    <Form.Control type="text" placeholder='Enter subject of email' value={subject} onChange={(e) => setsubject(e.target.value)} required />
                                </Form.Group><br />
                                <Form.Group>
                                    <Form.Label>Body</Form.Label>
                                    <Form.Control type="text" as='textarea' rows='5' placeholder='Enter body of email in html' value={body} onChange={(e) => setbody(e.target.value)} required />
                                </Form.Group><br /><br />
                                <Form.Group>
                                    <Form.Label>Emails</Form.Label>
                                    <Form.Control type='text' as='textarea' rows='3' placeholder='Add Emails of students, separate the emails with a comma' value={mails} onChange={(e) => setmails(e.target.value.trim())} required />
                                </Form.Group>
                                <Row className="justify-content-md-center" style={{ marginTop: '30px ' }}>
                                    <Col xs={12}>
                                        <Button size='lg' type='submit' variant='primary' onClick={(e) => sendMail(e)} style={{ width: '100%' }}>{loader ? <Spinner animation="border" size='sm' /> : 'Send Email'}</Button>
                                    </Col>
                                </Row>
                            </Form>
                        </div>
                        <Toast value={toast} callback={settoast}>
                            <BsPatchCheckFill size={18} style={{ color: '#32CD32' }} /> &nbsp; Emails Sent Successfully
                        </Toast>
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default withRouter(SendMail);