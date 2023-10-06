import React, { useEffect } from 'react';
import { Row, Col, Image, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import CareerLogo from '../assets/career.svg';
import { withRouter } from 'react-router-dom';

const LandingPage = (props) => {

    useEffect(() => {
        const token = localStorage.getItem('auth-token');
        if (token) {
            props.history.push('/dashboard')
        }
    }, [props.history]);

    return (
        <>
            <Row className="Home justify-content-md-center" style={{ backgroundImage: "url('https://img.freepik.com/free-vector/white-abstract-background_23-2148810113.jpg?w=2000')" }}>
                <Col className="right-side" sm={12} md={8} style={{ padding: '0 10px' }}>
                    <p className="banner-title">Training and Placement Cell</p>
                    <p className="banner-sub">Computer Science & Engineering Dept.</p>
                    <a href="https://rguktsklm.ac.in" target="_blank" rel="noopener noreferrer" style={{ fontSize: '16px', fontWeight: 'bold', color: '#625bf6', textAlign: 'center', textDecoration: 'none' }}>Rajiv Gandhi University of Knowledge Technologies Srikakulam</a>
                    <Image src={CareerLogo} alt="career logo" style={{ maxWidth: '350px', width: '100%', margin: '50px 0', padding: '10px' }} fluid />
                    <p style={{ fontSize: '16px', color: '#6b818b', textAlign: 'center' }}>Success usually comes to those who are too busy to be looking for it..</p>
                    <br />
                    <Row style={{ maxWidth: '500px', width: '100%' }}>
                        <Col>
                            <Button style={{ fontSize: '16px', maxWidth: '250px', width: '100%', fontWeight: 'bold' }} as={Link} to="/login">Login</Button>
                        </Col>
                        <Col>
                            <Button style={{ fontSize: '16px', maxWidth: '250px', width: '100%', fontWeight: 'bold' }} variant="outline-primary" as={Link} to="/register">Create Account</Button>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </>
    )
}

export default withRouter(LandingPage);
