import React, { useState, useEffect } from 'react'
import { Table, Container, Image } from 'react-bootstrap';
import axios from '../../axios';
import { Helmet } from 'react-helmet'
import FeedbackImage from '../../assets/feedback.png';
import { withRouter } from 'react-router-dom';

const SendFeedback = (props) => {
    const [feedbacks, setfeedbacks] = useState([]);

    useEffect(() => {
        if (!localStorage.getItem('admin-token')) {
            props.history.push('/admin/login');
        } else {
            // fetch feedbacks 
            const url = '/admin/feedbacks';
            axios.get(url, {
                headers: {
                    "auth-token": localStorage.getItem('admin-token')
                }
            }).then((res) => {
                setfeedbacks(res.data)
            })
                .catch((err) => console.log(err))
        }
    }, []);
    return (
        <>
            <Helmet>
                <title>Students Feedback | Admin</title>
            </Helmet>
            <Container className="Admin">
                <div style={{ display: 'flex', alignItems: 'center', margin: '50px 0' }}>
                    <div style={{ marginRight: '20px' }}>
                        <Image src={FeedbackImage} alt="notification image" fluid style={{ maxHeight: '40px' }} />
                    </div>
                    <div>
                        <p className="heading">Student Feedbacks</p>
                        <p className="sub-heading">See the feedbacks of the students recieved through website.</p>
                    </div>
                </div>
                <Table variant="dark" striped hover>
                    <thead>
                        <tr>
                            <th>S.No</th>
                            <th>Student Id</th>
                            <th>Message</th>
                        </tr>
                    </thead>
                    <tbody>
                        {feedbacks.map((feedback, i) =>
                            <tr key={i}>
                                <td>{i + 1}</td>
                                <td>{feedback.idNo}</td>
                                <td>{feedback.message}</td>
                            </tr>
                        )}
                    </tbody>
                </Table>
            </Container>
        </>
    )
}

export default withRouter(SendFeedback)