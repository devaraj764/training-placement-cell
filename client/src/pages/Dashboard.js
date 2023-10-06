import React, { useEffect, useState } from 'react';
import { withRouter, Switch, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Navbar from '../components/helpers/Navbar';
import Profile from '../components/Profile';
import Home from '../components/Home';
import Notifications from '../components/Notifications';
import Footer from '../components/helpers/Footer';
import PageNotFound from '../pages/PageNotFound';
import axios from '../axios';
import { Helmet } from 'react-helmet'

const Dashboard = (props) => {
    const [username, setusername] = useState('');
    const [idNo, setidNo] = useState('');
    const [id, setId] = useState(null);

    const [notifications, setNotifications] = useState([]);
    const [isNew, setisNew] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('auth-token');
        if (!token) {
            props.history.push('/login')
        }
    }, [props.history]);

    useEffect(() => {
        const url = '/students/mydata'
        axios.get(url, {
            headers: {
                "auth-token": localStorage.getItem('auth-token'),
            }
        }).then((res) => {
            setusername(res.data.name)
            setidNo(res.data.idNo)
            setId(res.data._id)
        }).catch((err) => {
            if (!err.request.data) Logout();
        });
    }, []);

    useEffect(() => {
        const url = '/students/notifications'
        axios.get(url).then((res) => {
            setNotifications(res.data.message)
            if (localStorage.getItem('notifications')) {
                if (localStorage.getItem('notifications') < res.data.message.length) {
                    setisNew(true)
                }
            } else {
                localStorage.setItem('notifications', res.data.message.length)
            }
        }).catch((err) => {
            setNotifications('error')
        });
    }, []);

    const Logout = () => {
        localStorage.removeItem('auth-token')
    }

    return (
        <>
            <Helmet>
                <title>Student Dashboard | TPC</title>
            </Helmet>
            <div className="Dashboard">
                <Navbar isNew={isNew} setisNew={setisNew} notificationsLength={notifications.length} />
                <Container>
                    <Switch>
                        <Route exact path='/dashboard' render={() => <Home username={username} id={id} idNo={idNo} />}></Route>
                        <Route exact path='/dashboard/notifications' render={() => <Notifications history={props.history} notifications={notifications} />}></Route>
                        <Route exact path='/dashboard/profile' render={() => <Profile history={props.history} />}></Route>
                        <Route path="*" render={() => <PageNotFound />} />
                    </Switch>
                </Container>
            </div>
            <Footer />
        </>
    );
};

export default withRouter(Dashboard);