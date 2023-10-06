import React, { useState, useEffect } from 'react'
import { Col, Card, Form, Accordion, Row, Button } from 'react-bootstrap';
import { FiLink } from 'react-icons/fi'
import { MdDelete } from 'react-icons/md'


const Certifications = (props) => {
    const [addNew, setaddNew] = useState(false);
    const [certifications, setcertifications] = useState([]);
    const [newCertification, setnewCertification] = useState({
        'title': '',
        'organization': '',
        'startDate': '',
        'endDate': '',
        'status': '',
        'link': ''
    });

    useEffect(() => {
        setcertifications(props.profileData.certifications ? props.profileData.certifications : []);
    }, [props.profileData]);

    const addCertification = () => {
        setnewCertification({
            'title': '',
            'organization': '',
            'startDate': '',
            'endDate': '',
            'status': '',
            'link': ''
        })
        props.setDirty();
        setcertifications([...certifications, newCertification]);
        props.setupdatedProfile({ ...props.updatedProfile, certifications: [...certifications, newCertification] });
        setaddNew(false);
    }

    const updateCertification = (index, key, value) => {
        props.setDirty();
        const newCertifications = [...certifications];
        newCertifications[index] = {
            ...newCertifications[index],
            [key]: value
        }
        setcertifications(newCertifications);
        props.setupdatedProfile({ ...props.updatedProfile, certifications: newCertifications });
    }

    const deleteCertification = (index) => {
        props.setDirty();
        setcertifications(certifications.filter((_, i) => i !== index));
        props.setupdatedProfile({ ...props.updatedProfile, certifications: certifications.filter((_, i) => i !== index) });
    }

    return (
        <div className="Certifications">
            <p className="heading">Certifications</p>
            <p className="message">Add your new course certifications and status</p>
            <Card body style={{ padding: '10px', fontSize: '14px' }}>
                {
                    props.edit && addNew ?
                        <>
                            <Form.Label htmlFor="title">Title</Form.Label>
                            <Form.Control
                                defaultValue={newCertification.title}
                                onChange={(e) => { setnewCertification({ ...newCertification, title: e.target.value }); props.setDirty() }}
                                as='input'
                                type='text'
                                id='title'
                                placeholder="Enter your certification title.."
                            />
                            <br />
                            <Form.Label htmlFor="organization">Organization name:</Form.Label>
                            <Form.Control
                                defaultValue={newCertification.organization}
                                onChange={(e) => { setnewCertification({ ...newCertification, organization: e.target.value }); props.setDirty() }}
                                as='input'
                                type='text'
                                id='organization'
                                placeholder="Enter organization name you have been certified by.."
                            />
                            <br />
                            <Row>
                                <Col md={6} sm={12} style={{ marginTop: '10px' }}>
                                    <Form.Label htmlFor="start-date">Starting date</Form.Label>
                                    <Form.Control
                                        defaultValue={newCertification.startDate}
                                        onChange={(e) => { setnewCertification({ ...newCertification, startDate: e.target.value }); props.setDirty() }}
                                        type="date"
                                        id="start-date"
                                        size='sm'
                                        placeholder="start date"
                                        style={{ marginBottom: "10px" }}
                                    />
                                </Col>
                                <Col md={6} sm={12} style={{ marginTop: '10px' }}>
                                    <Form.Label htmlFor="status">Status</Form.Label>
                                    <Form.Select id="status" size='sm' style={{ marginBottom: "10px" }} defaultValue={newCertification.status} onChange={(e) => { setnewCertification({ ...newCertification, status: e.target.value }); props.setDirty() }}>
                                        <option value="working">working</option>
                                        <option value="completed">completed</option>
                                    </Form.Select>
                                </Col>
                                {
                                    newCertification.status === 'completed' ?
                                        <>
                                            <Col md={6} sm={12} style={{ marginTop: '10px' }}>
                                                <Form.Label htmlFor="end-date">End date</Form.Label>
                                                <Form.Control
                                                    defaultValue={newCertification.endDate}
                                                    onChange={(e) => { setnewCertification({ ...newCertification, endDate: e.target.value }); props.setDirty() }}
                                                    type="date"
                                                    id="end-date"
                                                    size='sm'
                                                    placeholder="end date"
                                                    style={{ marginBottom: "10px" }}
                                                />
                                            </Col>
                                            <Col md={6} sm={12} style={{ marginTop: '10px' }}>
                                                <Form.Label htmlFor="link">Certificate Link</Form.Label>
                                                <Form.Control
                                                    defaultValue={newCertification.link}
                                                    onChange={(e) => { setnewCertification({ ...newCertification, link: e.target.value }); props.setDirty() }}
                                                    as='input'
                                                    type='text'
                                                    id='link'
                                                    placeholder="Enter your link of the certificate"
                                                />
                                            </Col>
                                        </>
                                        : null
                                }
                            </Row>
                        </>
                        :
                        <Accordion>
                            {certifications.length === 0 ? <p style={{ textAlign: 'center', width: '100%', color: 'gray' }}> No Certifications Available!<br /> Try to add new Certifications...</p> :
                                certifications.map((certification, index) => {
                                    return (
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }} key={index}>
                                            {
                                                props.edit ?
                                                    <span onClick={() => deleteCertification(index)} style={{ marginRight: '10px', color: 'tomato', cursor: 'pointer' }}><MdDelete size={24} /></span> : null
                                            }
                                            <Accordion.Item style={{ width: '100%' }} eventKey={index}>
                                                <Accordion.Header>{certification.title}</Accordion.Header>
                                                <Accordion.Body>
                                                    {
                                                        !props.edit ?
                                                            <Row style={{ margin: '0 10px', textAlign: 'center' }}>
                                                                <Col style={{ float: 'left', marginBottom: "10px", color: '#071a84' }}>{certification.startDate}</Col>
                                                                <Col style={{ float: 'right', marginBottom: "10px", color: '#071a84' }}>{certification.endDate}</Col>
                                                                {certification.link !== '' ? <Col style={{ float: 'right', marginBottom: "10px", color: '#071a84' }}><a href={certification.link} rel="noopener noreferrer" target="_blank" style={{ textDecoration: 'none' }}><FiLink size={14} />&nbsp;Certifiicate</a></Col> : null}
                                                            </Row>
                                                            :
                                                            <Row>
                                                                <Col md={6} sm={12}>
                                                                    <Form.Label htmlFor="start-date">Starting date</Form.Label>
                                                                    <Form.Control
                                                                        defaultValue={certification.startDate}
                                                                        onChange={(e) => updateCertification(index, 'startDate', e.target.value)}
                                                                        type="date"
                                                                        id="start-date"
                                                                        size='sm'
                                                                        placeholder="start date"
                                                                        style={{ marginBottom: "10px" }}
                                                                    />
                                                                </Col>
                                                                <Col md={6} sm={12}>
                                                                    <Form.Label htmlFor="status">Status</Form.Label>
                                                                    <Form.Select defaultValue={certification.status} size='sm' style={{ marginBottom: "10px" }} onChange={(e) => updateCertification(index, 'status', e.target.value)}>
                                                                        <option value="working">working</option>
                                                                        <option value="completed">completed</option>
                                                                    </Form.Select>
                                                                </Col>
                                                                {
                                                                    certification.status === 'completed' ?
                                                                        certification.status === 'completed' ?
                                                                            <>
                                                                                <Col md={6} sm={12} style={{ marginTop: '10px' }}>
                                                                                    <Form.Label htmlFor="end-date">End date</Form.Label>
                                                                                    <Form.Control
                                                                                        defaultValue={certification.endDate}
                                                                                        onChange={(e) => updateCertification(index, 'endDate', e.target.value)}
                                                                                        type="date"
                                                                                        id="end-date"
                                                                                        size='sm'
                                                                                        placeholder="end date"
                                                                                        style={{ marginBottom: "10px" }}
                                                                                    />
                                                                                </Col>
                                                                                <Col md={6} sm={12} style={{ marginTop: '10px' }}>
                                                                                    <Form.Label htmlFor="link">Certificate Link</Form.Label>
                                                                                    <Form.Control
                                                                                        defaultValue={certification.link}
                                                                                        onChange={(e) => updateCertification(index, 'link', e.target.value)}
                                                                                        as='input'
                                                                                        type='text'
                                                                                        id='link'
                                                                                        placeholder="Enter your link of the certificate"
                                                                                    />
                                                                                </Col>
                                                                            </>
                                                                            : null : null
                                                                }
                                                            </Row>
                                                    }<br />
                                                    <Form.Control
                                                        defaultValue={certification.organization}
                                                        onChange={(e) => updateCertification(index, 'organization', e.target.value)}
                                                        type="text"
                                                        size='sm'
                                                        placeholder="Organization name"
                                                        disabled={!props.edit}
                                                    />
                                                </Accordion.Body>
                                            </Accordion.Item>
                                        </div>
                                    )
                                })}
                        </Accordion>
                }
                {
                    props.edit ?
                        addNew ?
                            <div style={{ marginTop: '20px' }}>
                                <Button size="sm" style={{ float: 'right', width: '100px', borderRadius: '25px' }} onClick={addCertification}>push</Button>
                                <Button variant="light" size="sm" style={{ float: 'right', width: '100px', borderRadius: '25px', marginRight: '10px' }} onClick={() => { setaddNew(false); props.setPristine(); }}>cancel</Button>
                            </div>
                            :
                            <Button size="sm" style={{ float: 'right', width: '100px', borderRadius: '25px', marginTop: '20px' }} onClick={() => setaddNew(true)}>+ Add</Button>

                        : null
                }
            </Card>
        </div>
    )
}

export default Certifications