import React, { useEffect } from 'react'
import { Row, Col, Card, Form, InputGroup, FormControl } from 'react-bootstrap';
import { MdPermIdentity, MdEmail, MdBatchPrediction, MdPhone } from 'react-icons/md';
import { BiRename, BiShowAlt, BiHide } from 'react-icons/bi'
import { FaBirthdayCake, FaBook } from 'react-icons/fa';
import { SiGoogleclassroom } from 'react-icons/si';

const PersonalProfile = ({ edit, profileData, updatedProfile, setupdatedProfile, setDirty }) => {

    const [privacy, setPrivacy] = React.useState(profileData.privacy);

    useEffect(() => {
        setupdatedProfile({ ...updatedProfile, privacy: privacy });
    }, [privacy])

    return (
        <div className="personal-details">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: 'fit-content' }}>
                <div style={{ margin: '0px' }}>
                    <p className="heading">Personal Details</p>
                    <p className="message">Update your photo and personal details here</p>
                </div>
                {edit ?
                    privacy ?
                        <p onClick={() => { setPrivacy(false); setDirty(); }} style={{ minWidth: '100px', borderRadius: '10px', boxShadow: 'none', display: 'flex', alignItems: 'center', fontWeight: 'bold', fontSize: '16px', cursor: 'pointer', color: 'gray' }} size='sm'><BiHide size={18} /> &nbsp;  Private</p>
                        : <p onClick={() => { setPrivacy(true); setDirty(); }} style={{ minWidth: '100px', borderRadius: '10px', boxShadow: 'none', display: 'flex', alignItems: 'center', fontWeight: 'bold', fontSize: '16px', cursor: 'pointer' }} size='sm'><BiShowAlt size={18} /> &nbsp; Public</p>
                    : null
                }
            </div>
            <Card body style={{ padding: '10px', fontSize: '14px' }}>
                <Row>
                    <Col md={6} sm={12}>
                        <Form.Label htmlFor="fullname" className="label">Full Name</Form.Label>
                        <InputGroup className="mb-3">
                            <InputGroup.Text id="basic-addon1"><BiRename /></InputGroup.Text>
                            <FormControl
                                onChange={(e) => { setupdatedProfile({ ...updatedProfile, name: e.target.value }); setDirty() }}
                                type='text'
                                defaultValue={profileData.name}
                                placeholder="Full Name"
                                aria-label="idnumber"
                                aria-describedby="basic-addon1"
                                disabled={!edit}
                            />
                        </InputGroup>
                    </Col>
                    <Col md={6} sm={12}>
                        <Form.Label htmlFor="studentid" className="label">Student ID</Form.Label>
                        <InputGroup className="mb-3">
                            <InputGroup.Text id="basic-addon1"><MdPermIdentity /></InputGroup.Text>
                            <FormControl
                                type='text'
                                defaultValue={profileData.idNo}
                                placeholder="Id Number"
                                aria-label="studentid"
                                aria-describedby="basic-addon1"
                                disabled
                            />
                        </InputGroup>
                    </Col>
                    <Col md={6} sm={12}>
                        <Form.Label htmlFor="email" className="label">Email</Form.Label>
                        <InputGroup className="mb-3">
                            <InputGroup.Text id="basic-addon1"><MdEmail /></InputGroup.Text>
                            <FormControl
                                onChange={(e) => { setupdatedProfile({ ...updatedProfile, email: e.target.value }) }}
                                type='text'
                                defaultValue={profileData.email}
                                placeholder="collage email address"
                                aria-label="collageemail"
                                aria-describedby="basic-addon1"
                                disabled
                            />
                        </InputGroup>
                    </Col>
                    <Col md={6} sm={12}>
                        <Form.Label htmlFor="classcode" className="label">Section Code</Form.Label>
                        <InputGroup className="mb-3">
                            <InputGroup.Text id="basic-addon1"><SiGoogleclassroom /></InputGroup.Text>
                            <Form.Select
                                onChange={(e) => { setupdatedProfile({ ...updatedProfile, section: e.target.value }); setDirty() }}
                                type='text'
                                defaultValue={profileData.section ? profileData.section : '-- select --'}
                                placeholder="section code"
                                aria-label="sectioncode"
                                aria-describedby="basic-addon1"
                                disabled={!edit}
                            >
                                <option disabled>-- select --</option>
                                <option value="A">A</option>
                                <option value="B">B</option>
                                <option value="C">C</option>
                                <option value="D">D</option>
                                <option value="E">E</option>
                                <option value="F">F</option>
                            </Form.Select>
                        </InputGroup>
                    </Col>
                    <Col md={6} sm={12}>
                        <Form.Label htmlFor="dob" className="label">Date of Birth</Form.Label>
                        <InputGroup className="mb-3">
                            <InputGroup.Text id="basic-addon1"><FaBirthdayCake /></InputGroup.Text>
                            <FormControl
                                onChange={(e) => { setupdatedProfile({ ...updatedProfile, dob: e.target.value }); setDirty() }}
                                type='date'
                                defaultValue={profileData.dob}
                                placeholder="Enter your date of birth"
                                aria-label="dob"
                                aria-describedby="basic-addon1"
                                disabled={!edit}
                            />
                        </InputGroup>
                    </Col>
                    <Col md={6} sm={12}>
                        <Form.Label htmlFor="batch" className="label">Batch</Form.Label>
                        <InputGroup className="mb-3">
                            <InputGroup.Text id="basic-addon1"><MdBatchPrediction /></InputGroup.Text>
                            <Form.Select
                                onChange={(e) => { setupdatedProfile({ ...updatedProfile, batch: e.target.value }); setDirty() }}
                                type='text'
                                defaultValue={profileData.batch ? profileData.batch : '-- select --'}
                                placeholder="Enter your bacth"
                                aria-label="batch"
                                aria-describedby="basic-addon1"
                                disabled={!edit}
                            >
                                <option disabled>-- select --</option>
                                <option value="2017">2017</option>
                                <option value="2018">2018</option>
                                <option value="2019">2019</option>
                                <option value="2020">2020</option>
                                <option value="2021">2021</option>
                                <option value="2022">2022</option>
                            </Form.Select>
                        </InputGroup>
                    </Col>
                    <Col md={6} sm={12}>
                        <Form.Label htmlFor="yearofstudy" className="label">Year of Study</Form.Label>
                        <InputGroup className="mb-3">
                            <InputGroup.Text id="basic-addon1"><FaBook /></InputGroup.Text>
                            <Form.Select
                                onChange={(e) => { setupdatedProfile({ ...updatedProfile, yearofStudy: e.target.value }); setDirty() }}
                                type='text'
                                defaultValue={profileData.yearofStudy ? profileData.yearofStudy : '-- select --'}
                                placeholder="Enter your year of study"
                                aria-label="yearofstudy"
                                aria-describedby="basic-addon1"
                                disabled={!edit}
                            >
                                <option disabled>-- select --</option>
                                <option value="E3">E3</option>
                                <option value="E4">E4</option>
                            </Form.Select>
                        </InputGroup>
                    </Col>
                    <Col md={6} sm={12}>
                        <Form.Label htmlFor="contactNumber" className="label">Contact Number</Form.Label>
                        <InputGroup className="mb-3">
                            <InputGroup.Text id="basic-addon1"><MdPhone /></InputGroup.Text>
                            <FormControl
                                onChange={(e) => { setupdatedProfile({ ...updatedProfile, contactNumber: e.target.value }); setDirty() }}
                                type='text'
                                defaultValue={profileData.contactNumber}
                                placeholder="Enter your contact number"
                                aria-label="contactNumber"
                                aria-describedby="basic-addon1"
                                disabled={!edit}
                            />
                        </InputGroup>
                    </Col>
                    <Col sm={12}>
                        <Form.Label htmlFor="contactNumber" className="label">Address</Form.Label>
                        <InputGroup className="mb-3">
                            <FormControl
                                onChange={(e) => { setupdatedProfile({ ...updatedProfile, address: e.target.value }); setDirty() }}
                                as='textarea'
                                type='text'
                                defaultValue={profileData.address}
                                placeholder="Address"
                                aria-label="Address"
                                aria-describedby="basic-addon1"
                                disabled={!edit}
                            />
                        </InputGroup>
                    </Col>
                </Row>
            </Card>
            <Card body style={{ padding: '10px', fontSize: '14px', marginTop: '5px' }}>
                <Form.Label htmlFor="bio" className="label">Bio</Form.Label>
                <FormControl
                    defaultValue={profileData.bio}
                    onChange={(e) => { setupdatedProfile({ ...updatedProfile, bio: e.target.value }); setDirty() }}
                    as='textarea'
                    rows='5'
                    id="bio"
                    placeholder="Briefly describe yourself..."
                    disabled={!edit}
                />
            </Card>
        </div>
    )
}

export default PersonalProfile;