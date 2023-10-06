import React, { useState, useEffect } from 'react';
import { Form, Button, Col } from 'react-bootstrap'
import axios from '../../axios';
import { withRouter } from 'react-router-dom';

const Adminlogin = (props) => {
    const [username, setusername] = useState('');
    const [password, setpassword] = useState('');
    const [error, seterror] = useState('');

    useEffect(() => {
        if (localStorage.getItem('admin-token')) {
            props.history.push('/admin/dashboard');
        }
    }, []);

    const login = () => {
        if (username === '' || password === '') {
            seterror('Please fill all the fields');
            return;
        }
        const url = '/admin/login'
        axios.post(url, {
            "username": username,
            "password": password
        })
            .then((res) => {
                console.log(res)
                localStorage.setItem('admin-token', res.data.token)
                props.history.push('/admin/dashboard')
            })
            .catch((err) => {
                if (err) {
                    seterror(err.response.data.message)
                }
            })
    }


    return (
        <div className='container card' style={{ marginTop: '100px', padding: '50px 20px ' }}>
            <center>
                <img alt="admin" src="https://img.icons8.com/dotty/80/undefined/admin-settings-male.png" height="120" style={{ marginBottom: '30px' }} />
                <Form as={Col} sm={3}>
                    <Form.Group>
                        <Form.Label style={{ float: 'left' }}>Username</Form.Label>
                        <Form.Control type="text" placeholder='Enter username' value={username} onChange={(e) => setusername(e.target.value)} />
                    </Form.Group><br />
                    <Form.Group>
                        <Form.Label style={{ float: 'left' }}>Password</Form.Label>
                        <Form.Control type="password" placeholder='Enter password' value={password} onChange={(e) => setpassword(e.target.value)} />
                    </Form.Group><br />
                    <p style={{ color: 'tomato' }}>{error}</p>
                    <Button onClick={login} style={{ borderRadius: '20px', padding: '5px 20px', marginTop: '30px' }} variant="success">Login</Button>
                </Form>
            </center>
        </div>
    );
};

export default withRouter(Adminlogin);