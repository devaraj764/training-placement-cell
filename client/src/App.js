import {
  Switch,
  Route,
  withRouter,
  Redirect
} from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import axios from './axios';
import Home from './pages/Home.js'
import Dashboard from './pages/Dashboard';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';
import ViewProfile from './components/view-profile';
import PageNotFound from './pages/PageNotFound'
import Adminlogin from './pages/Admin/login.js';
import Admindashboard from './pages/Admin';
import LandingPage from './pages/LandingPage'
import { useMediaQuery } from 'react-responsive';
import Notifications from './components/Admin/Notifications';
import StudentList from './components/Admin/StudentList';
import Feedback from './components/Admin/Feedback';
import SendMail from './components/Admin/SendMail';
import TechnicalTeam from './pages/TPC_Team';
// import Alumini from './pages/Alumini/index';
 
function App() {

  const isMobile = useMediaQuery({ query: '(max-width: 576px)' })
  const [id, setid] = useState('');

  useEffect(() => {
    if (localStorage.getItem('auth-token')) {
      const url = '/students/mydata'
      axios.get(url, {
        headers: {
          "auth-token": localStorage.getItem('auth-token'),
        }
      }).then((res) => {
        setid(res.data._id)
      })
    }
  }, []);

  return (
    <Switch>
      {isMobile ? <Route exact path="/view-profile/:id" render={() => (
        <p className="preview-unavailable" style={{ textAlign: 'center', width: '100%', color: '#3c4852' }}>Sorry! No Preview available for this screen <br /> <span style={{ color: '#6b818b' }}>Change the screen to "Desktop site"</span></p>
      )}></Route> : <Route exact path='/view-profile/:id' render={() => <ViewProfile id={id} />}></Route>}
      <Route exact path='/login' render={() => <Home />}></Route>
      <Route exact path='/register' render={() => <Home />}></Route>
      <Route exact path='/tpc-technical-team' render={() => <TechnicalTeam />}></Route>
      <Route path='/dashboard' render={() => <Dashboard />}></Route>
      <Route exact path="/admin/login" render={() => <Adminlogin />}></Route>
      <Route exact path="/admin/dashboard" render={() => <Admindashboard />} />
      <Route exact path="/admin/dashboard/send-notification" render={() => <Notifications />} />
      <Route exact path="/admin/dashboard/studentslist" render={() => <StudentList />} />
      <Route exact path="/admin/dashboard/feedbacks" render={() => <Feedback />} />
      <Route exact path='/admin/dashboard/send-mail' render={() => <SendMail />} />
      <Route exact path='/admin'>
        <Redirect exact to='/admin/login' />
      </Route>
      <Route exact path="/" render={() => <LandingPage />}></Route>
      {/* <Route exact path="/alumini" render={() => <Alumini />} /> */}
      <Route path="*" render={() => <PageNotFound />} />
    </Switch>
  );
}

export default withRouter(App);
