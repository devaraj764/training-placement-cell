import axios from '../../axios';
import React, { useState } from 'react';
import { Row, Col, ListGroup, Button, Form } from 'react-bootstrap';
import Toast from '../helpers/Toast';
import { BsPatchCheckFill } from 'react-icons/bs';
import { BiLinkExternal } from 'react-icons/bi'

const Home = (props) => {
  const [feedback, setfeedback] = useState('');
  const [toast, setToast] = useState(false);

  const sendFeedback = () => {
    const url = '/students/feedback';
    axios.post(url, {
      idNo: props.idNo,
      message: feedback
    }, {
      headers: {
        "auth-token": localStorage.getItem('auth-token')
      }
    })
      .then((res) => {
        setToast(true);
        setfeedback('');
      })
      .catch((err) => console.log(err))
  }

  return (
    <div className="Home">
      <Row className="justify-content-md-center">
        <Col sm={12} lg={8}>
          <div className="header">
            <p className="Title">Hello! <br /><span>{props.username ? props.username : <span style={{ fontSize: '16px' }}>loading...</span>}</span></p>
          </div>
          <Row className="view-profile-banner">
            <a href={`/view-profile/${props.id}`} target="_blank" rel="noopener noreferrer">View and share your profile <BiLinkExternal /></a>
          </Row>
          <p className="heading">To Do's</p>
          <p className="message">Things you need to complete</p>
          <div className="box">
            <ListGroup numbered>
              <ListGroup.Item as="li" className="list-group-item">Complete your profile by clicking on profile nav button (on top-right corner)<a href='/dashboard/profile'><BiLinkExternal className='externalicon' size={16} /></a></ListGroup.Item>
              <ListGroup.Item as="li" className="list-group-item">Upload your profile image and describe yourself in bio</ListGroup.Item>
              <ListGroup.Item as="li" className="list-group-item">Add your hobbies and social links (Github, LinkedIn, hackerrank, leetcode ...)</ListGroup.Item>
              <ListGroup.Item as="li" className="list-group-item">Add your skills and rate them in skill section</ListGroup.Item>
              <ListGroup.Item as="li" className="list-group-item">Add education details in education section</ListGroup.Item>
              <ListGroup.Item as="li" className="list-group-item">Add your projects, internships, certifications and achievements in feats section</ListGroup.Item>
            </ListGroup>
          </div>
          <br />
          <br />
          <p className="heading">Send Feedback</p>
          <p className="message">Tell us what you feel</p>
          <div style={{ borderRadius: '10px', border: '1px solid #c8c8c8', marginTop: '10px'}}>
            <Form.Control
              as='textarea'
              rows={5}
              value={feedback}
              onChange={(e) => setfeedback(e.target.value)}
              placeholder="Enter your valuable suggestions to improve our site..."
            />
          </div>
          <Button variant="primary" size='lg' onClick={sendFeedback} style={{ marginTop: '20px', width: '100%', borderRadius: '10px' }}>
            Submit
          </Button>
          <br />
        </Col>
      </Row>
      <Toast value={toast} callback={setToast}>
        <BsPatchCheckFill size={18} style={{ color: '#32CD32' }} /> &nbsp; FeedBack sent successfully
      </Toast>
    </div>
  )
}

export default Home