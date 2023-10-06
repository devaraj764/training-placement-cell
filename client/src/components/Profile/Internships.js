import React, { useState, useEffect } from 'react'
import { Col, Card, Form, Accordion, Row, Button } from 'react-bootstrap';
import { MdDelete } from 'react-icons/md';


const Internships = (props) => {
    const [addNew, setaddNew] = React.useState(false)
    const [internships, setinternships] = useState([]);
    const [newInternship, setnewInternship] = useState({
        'role': '',
        'organization': '',
        'startDate': '',
        'endDate': '',
        'status': 'working',
        'certificate': '',
        'paid': 'yes',
        'duration': ''
    });

    useEffect(() => {
        setinternships(props.profileData.internships ? props.profileData.internships : []);
    }, [props.profileData]);

    const addInternship = () => {
        props.setDirty();
        setnewInternship({
            'role': '',
            'organization': '',
            'startDate': '',
            'endDate': '',
            'status': 'working',
            'certificate': '',
            'paid': 'yes',
            'duration': ''
        })
        setinternships([...internships, newInternship]);
        props.setupdatedProfile({ ...props.updatedProfile, internships: [...internships, newInternship] });
        setaddNew(false);
    }

    const updateInternship = (index, key, value) => {
        props.setDirty();
        const newInternships = [...internships];
        newInternships[index] = {
            ...newInternships[index],
            [key]: value
        }
        setinternships(newInternships);
        props.setupdatedProfile({ ...props.updatedProfile, internships: newInternships });
    }

    const deleteInternship = (index) => {
        props.setDirty();
        setinternships(internships.filter((_blank, i) => i !== index));
        props.setupdatedProfile({ ...props.updatedProfile, internships: internships.filter((_, i) => i !== index) });
    }

    return (
        <div className="Internships">
            <p className="heading">Internships</p>
            <p className="message">Add your new internships and status</p>
            <Card body style={{ padding: '10px', fontSize: '14px' }}>
                {
                    props.edit && addNew ?
                        <>
                            <Row>
                                <Col md={6} sm={12}>
                                    <Form.Label htmlFor="organization">Organization name:</Form.Label>
                                    <Form.Control
                                        defaultValue={newInternship.organization}
                                        onChange={(e) => { setnewInternship({ ...newInternship, organization: e.target.value }); props.setDirty(); }}
                                        as='input'
                                        size="sm"
                                        type='text'
                                        id='organization'
                                        placeholder="Enter organization name you worked for.."
                                        style={{ marginBottom: "10px" }}
                                    />
                                </Col>
                                <Col md={6} sm={12}>
                                    <Form.Label htmlFor="role">Role:</Form.Label>
                                    <Form.Control
                                        defaultValue={newInternship.role}
                                        onChange={(e) => { setnewInternship({ ...newInternship, role: e.target.value }); props.setDirty(); }}
                                        as='input'
                                        size="sm"
                                        type='text'
                                        id='role'
                                        placeholder="Enter your role in the Internship.."
                                        style={{ marginBottom: "10px" }}
                                    />
                                </Col>
                                <Col md={6} sm={12}>
                                    <Form.Label htmlFor="paid">Paid</Form.Label>
                                    <Form.Select id="paid" size='sm' style={{ marginBottom: "10px" }} defaultValue={newInternship.paid} onChange={(e) => { setnewInternship({ ...newInternship, paid: e.target.value }); props.setDirty() }}>
                                        <option value="Yes">Yes</option>
                                        <option value="no">no</option>
                                    </Form.Select>
                                </Col>
                                <Col md={6} sm={12}>
                                    <Form.Label htmlFor="duration">Duration (in Months):</Form.Label>
                                    <Form.Control
                                        defaultValue={newInternship.duration}
                                        onChange={(e) => { setnewInternship({ ...newInternship, duration: e.target.value }); props.setDirty(); }}
                                        as='input'
                                        size="sm"
                                        type='number'
                                        id='duration'
                                        placeholder="Duration of the internship"
                                        style={{ marginBottom: "10px" }}
                                    />
                                </Col>
                                <Col md={6} sm={12}>
                                    <Form.Label htmlFor="start-date">Starting date:</Form.Label>
                                    <Form.Control
                                        defaultValue={newInternship.startDate}
                                        onChange={(e) => { setnewInternship({ ...newInternship, startDate: e.target.value }); props.setDirty(); }}
                                        type="date"
                                        id="start-date"
                                        size='sm'
                                        placeholder="start date"
                                        style={{ marginBottom: "10px" }}
                                    />
                                </Col>
                                <Col md={6} sm={12}>
                                    <Form.Label htmlFor="status">Status</Form.Label>
                                    <Form.Select id="status" size='sm' style={{ marginBottom: "10px" }} defaultValue={newInternship.status} onChange={(e) => { setnewInternship({ ...newInternship, status: e.target.value }); props.setDirty() }}>
                                        <option value="working">working</option>
                                        <option value="completed">completed</option>
                                    </Form.Select>
                                </Col>
                                {
                                    newInternship.status === 'completed' ?
                                        <>
                                            <Col md={6} sm={12}>
                                                <Form.Label htmlFor="end-date">End date</Form.Label>
                                                <Form.Control
                                                    defaultValue={newInternship.endDate}
                                                    onChange={(e) => { setnewInternship({ ...newInternship, endDate: e.target.value }); props.setDirty(); }}
                                                    type="date"
                                                    id="end-date"
                                                    size='sm'
                                                    placeholder="end date"
                                                    style={{ marginBottom: "10px" }}
                                                />
                                            </Col>
                                            <Col md={6} sm={12}>
                                                <Form.Label htmlFor="certificate">Certificate Link</Form.Label>
                                                <Form.Control
                                                    defaultValue={newInternship.certificate}
                                                    onChange={(e) => { setnewInternship({ ...newInternship, certificate: e.target.value }); props.setDirty(); }}
                                                    type="text"
                                                    id="certificate"
                                                    size='sm'
                                                    placeholder="paste your link here..."
                                                    style={{ marginBottom: "10px" }}
                                                />
                                            </Col>
                                        </> : null
                                }
                            </Row>
                        </>
                        :
                        <Accordion>
                            {internships.length === 0 ? <p style={{ textAlign: 'center', width: '100%', color: 'gray' }}> No Internships Available!<br /> Try to add new Internships...</p>
                                : internships.map((internship, index) => {
                                    return (
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }} key={index}>
                                            {
                                                props.edit ?
                                                    <span onClick={() => { deleteInternship(index) }} style={{ marginRight: '10px', color: 'tomato', cursor: 'pointer' }}><MdDelete size={24} /></span> : null
                                            }
                                            <Accordion.Item style={{ width: '100%' }} eventKey={index}>
                                                <Accordion.Header>
                                                    {internship.role}
                                                </Accordion.Header>
                                                <Accordion.Body>

                                                    <Row>
                                                        <Col md={6} sm={12}>
                                                            <Form.Label htmlFor="organization">Organization name</Form.Label>
                                                            <Form.Control
                                                                type="text"
                                                                id="organization"
                                                                size='sm'
                                                                onChange={(e) => updateInternship(index, 'organization', e.target.value)}
                                                                defaultValue={internship.organization}
                                                                placeholder="Organization name"
                                                                disabled={!props.edit}
                                                                style={{ marginBottom: "10px" }}
                                                            />
                                                        </Col>
                                                        <Col md={6} sm={12}>
                                                            <Form.Label htmlFor="paid">Paid</Form.Label>
                                                            <Form.Select id="paid" size='sm' disabled={!props.edit} style={{ marginBottom: "10px" }} defaultValue={internship.paid} onChange={(e) => updateInternship(index, 'paid', e.target.value)}>
                                                                <option value="Yes">Yes</option>
                                                                <option value="no">no</option>
                                                            </Form.Select>
                                                        </Col>
                                                        <Col md={6} sm={12}>
                                                            <Form.Label htmlFor="start-date">Starting date</Form.Label>
                                                            <Form.Control
                                                                defaultValue={internship.startDate}
                                                                onChange={(e) => updateInternship(index, 'startDate', e.target.value)}
                                                                type="date"
                                                                id="start-date"
                                                                size='sm'
                                                                placeholder="start date"
                                                                disabled={!props.edit}
                                                                style={{ marginBottom: "10px" }}
                                                            />
                                                        </Col>
                                                        <Col md={6} sm={12}>
                                                            <Form.Label htmlFor="duration">Duration (in Months):</Form.Label>
                                                            <Form.Control
                                                                defaultValue={internship.duration}
                                                                onChange={(e) => updateInternship(index, 'duration', e.target.value)}
                                                                as='input'
                                                                size="sm"
                                                                type='number'
                                                                id='duration'
                                                                disabled={!props.edit}
                                                                placeholder="Duration of the internship"
                                                                style={{ marginBottom: "10px" }}
                                                            />
                                                        </Col>
                                                        <Col sm={12}>
                                                            <Row>
                                                                <Col>
                                                                    <Form.Label htmlFor="status">Status</Form.Label>
                                                                    <Form.Select defaultValue={internship.status} id={internship.role} disabled={!props.edit} size='sm' style={{ marginBottom: "10px" }} onChange={(e) => { updateInternship(index, 'status', e.target.value); }}>
                                                                        <option value="working">working</option>
                                                                        <option value="completed">completed</option>
                                                                    </Form.Select>
                                                                </Col>
                                                                {
                                                                    internship.status === 'completed' ?
                                                                        internship.status === 'completed' ?
                                                                            <>
                                                                                <Col>
                                                                                    <Form.Label htmlFor="end-date">End date</Form.Label>
                                                                                    <Form.Control
                                                                                        defaultValue={internship.endDate}
                                                                                        onChange={(e) => updateInternship(index, 'endDate', e.target.value)}
                                                                                        type="date"
                                                                                        id="end-date"
                                                                                        size='sm'
                                                                                        placeholder="end date"
                                                                                        disabled={!props.edit}
                                                                                        style={{ marginBottom: "10px" }}
                                                                                    />
                                                                                </Col>
                                                                            </>
                                                                            : null : null
                                                                }
                                                            </Row>
                                                        </Col>
                                                        {
                                                            internship.status === 'completed' && props.edit ?
                                                                <Col sm={12}>
                                                                    <Form.Label htmlFor="certificate">Certificate Link</Form.Label>
                                                                    <Form.Control
                                                                        defaultValue={internship.certificate}
                                                                        onChange={(e) => updateInternship(index, 'certificate', e.target.value)}
                                                                        type="text"
                                                                        id="certificate"
                                                                        size='sm'
                                                                        placeholder="paste your link here..."
                                                                        style={{ marginBottom: "10px" }}
                                                                    />
                                                                </Col> :
                                                                internship.certificate ?
                                                                    <a href={internship.certificate} style={{ textAligin: 'center' }} rel="noopener noreferrer" target="_blank">View cerificate</a>
                                                                    : null
                                                        }
                                                    </Row>
                                                </Accordion.Body>
                                            </Accordion.Item>
                                        </div>
                                    )
                                })
                            }
                        </Accordion>
                }
                {
                    props.edit ?
                        addNew ?
                            <div style={{ marginTop: '20px' }}>
                                <Button size="sm" style={{ float: 'right', width: '100px', borderRadius: '25px' }} onClick={addInternship}>push</Button>
                                <Button variant="light" size="sm" style={{ float: 'right', width: '100px', borderRadius: '25px', marginRight: '10px' }} onClick={() => { setaddNew(false); props.setPristine() }}>cancel</Button>
                            </div>
                            :
                            <Button size="sm" style={{ float: 'right', width: '100px', borderRadius: '25px', marginTop: '20px' }} onClick={() => setaddNew(true)}>+ Add</Button>

                        : null
                }
            </Card>
        </div>
    )
}

export default Internships