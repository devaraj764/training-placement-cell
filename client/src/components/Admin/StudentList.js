import React, { useState, useEffect } from 'react';
import { Table, Form, Container, Image, Button } from 'react-bootstrap';
import axios from '../../axios';
import { Helmet } from 'react-helmet'
import { withRouter } from 'react-router-dom';
import { BiLinkExternal } from 'react-icons/bi'
import ListStudents from '../../assets/customer.png';

const StudentList = (props) => {

    const [students, setstudents] = useState([]);
    const [filteredStudents, setfilteredStudents] = useState([]);
    const [emails, setemails] = useState([]);

    useEffect(() => {
        if (!localStorage.getItem('admin-token')) {
            props.history.push('/admin/login');
        } else {
            // fetch students
            const url = '/students';
            axios.get(url).then((res) => {
                console.log(res.data);
                setstudents(res.data)
                setfilteredStudents(res.data)
            })
                .catch((err) => console.log(err))

        }
    }, []);

    const [searchInput, setsearchInput] = useState('');
    const searchStudents = () => {
        let filteredStudents = students.filter(student => student.idNo.toUpperCase().includes(searchInput.toUpperCase()));
        setfilteredStudents(filteredStudents);
    }

    const selectMail = (value, email) => {
        if (value === true) {
            setemails([...emails, email])
        } else {
            setemails(emails.filter(e => e !== email))
        }
    }

    const selectAll = (value) => {
        if (value === true) {
            let emails = []
            students.map(student => emails.push(student.email))
            setemails(emails)
            let checkbox = document.getElementsByName('checkbox')
            for (let i = 0; i < checkbox.length; i++) {
                checkbox[i].checked = true
            }
        } else {
            setemails([])
            let checkbox = document.getElementsByName('checkbox')
            for (let i = 0; i < checkbox.length; i++) {
                checkbox[i].checked = false
            }
        }
    }


    return (
        <>
            <Helmet>
                <title>Students List | Admin</title>
            </Helmet>
            <Container className="Admin">
                <div style={{ display: 'flex', alignItems: 'center', margin: '50px 0' }}>
                    <div style={{ marginRight: '20px' }}>
                        <Image src={ListStudents} alt="notification image" fluid style={{ maxHeight: '50px' }} />
                    </div>
                    <div>
                        <p className="heading">Students List</p>
                        <p className="sub-heading">Admin can get the students lists and can apply filters.</p>
                    </div>
                </div>
                <div className="view-unavailable">Content cannot be viewed in this screen.</div>
                <div className="StudentList-Table">
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Form.Control style={{ maxWidth: '400px', margin: '20px 0' }} type="text" onChange={(e) => setsearchInput(e.target.value)} onKeyUp={searchStudents} placeholder="Search Students By ID" />
                        {emails.length === 0 ? null : <Button style={{ float: 'right', height: '50px', marginTop: '20px' }} onClick={() => props.history.push('/admin/dashboard/send-mail', { emails: emails })}>Send Email</Button>}
                    </div>
                    <Table variant="dark" striped hover>
                        <thead>
                            <tr>
                                <th><input type='checkbox' style={{ width: '20px' }} onChange={(e) => selectAll(e.target.checked)} /><br />Select all</th>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Mobile</th>
                                <th>Batch</th>
                                <th>Year of Study</th>
                                <th>Section</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredStudents.map((student, i) =>
                                <tr key={i}>
                                    <td><input type='checkbox' style={{ width: '20px' }} name="checkbox" onChange={(e) => selectMail(e.target.checked, student.email)} /></td>
                                    <td>{student.idNo}</td>
                                    <td>{student.name}</td>
                                    <td>{student.email}</td>
                                    <td>{student.contactNumber}</td>
                                    <td>{student.batch}</td>
                                    <td>{student.yearofStudy}</td>
                                    <td>{student.section}</td>
                                    <td><a style={{ textDecoration: 'none' }} target='_blank' rel='noreferrer noopener' href={`/view-profile/${student._id}`}>View profile <BiLinkExternal /></a></td>
                                </tr>
                            )}
                        </tbody>
                    </Table><br />
                </div>
            </Container>
        </>
    )
}

export default withRouter(StudentList)