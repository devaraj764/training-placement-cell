import React, { useState } from 'react'
import { Row, Col, Card, Form, InputGroup, FormControl, Accordion } from 'react-bootstrap';

const EducationDetails = ({ edit, profileData, updatedProfile, setupdatedProfile, setDirty }) => {
    const [schooling, setschooling] = useState(profileData ? profileData.schooling : null);
    const [preGraduation, setpreGraduation] = useState(profileData ? profileData.preGraduation : null);
    const [graduation, setgraduation] = useState(profileData ? profileData.graduation : null);

    const updateSchoolingDetails = (key, value) => {
        setDirty();
        setschooling({ ...schooling, [key]: value });
        setupdatedProfile({ ...updatedProfile, schooling: { ...schooling, [key]: value } });
    }

    const updatepreGraduation = (key, value) => {
        setDirty();
        setpreGraduation({ ...preGraduation, [key]: value });
        setupdatedProfile({ ...updatedProfile, preGraduation: { ...preGraduation, [key]: value } });
    }

    const updateGraduation = (key, value) => {
        setDirty();
        setgraduation({ ...graduation, [key]: value });
        setupdatedProfile({ ...updatedProfile, graduation: { ...graduation, [key]: value } });
    }

    const calculateAverageCgpa = (key, value) => {
        setDirty();
        let newallCgpa = { ...graduation.allcgpa, [key]: value };
        let sum = parseFloat("0.0");
        for (let key in newallCgpa) {
            sum += parseFloat(newallCgpa[key]);
        }
        let total = sum / 8;
        setgraduation({ ...graduation, allcgpa: { ...graduation.allcgpa, [key]: value }, cgpa: Number((total).toFixed(1)) });
        setupdatedProfile({ ...updatedProfile, graduation: { ...graduation, allcgpa: { ...graduation.allcgpa, [key]: value }, cgpa: Number((total).toFixed(1)) } })
    }


    return (
        <div className="educational-details">
            <p className="heading">Educational Details</p>
            <p className="message">Update your educational details here</p>
            {/* School Details  */}
            <Card body style={{ padding: '10px' }}>
                <p className="sub-heading">Schooling</p>
                <Row>
                    <Col sm={12}>
                        <InputGroup className="mb-3">
                            <InputGroup.Text id="basic-addon1">at</InputGroup.Text>
                            <FormControl
                                onChange={(e) => updateSchoolingDetails('name', e.target.value)}
                                value={schooling.name}
                                placeholder="School Name"
                                aria-label="SchoolName"
                                aria-describedby="basic-addon1"
                                id="schoolName"
                                disabled={!edit}
                            />
                        </InputGroup>
                    </Col>
                    <Col md={6} sm={12}>
                        <InputGroup className="mb-3">
                            <InputGroup.Text id="basic-addon1">Passed Out</InputGroup.Text>
                            <Form.Select value={schooling.passout || schooling.passout !== '' ? schooling.passout : 'Year'} id="passout" aria-label="Default select example" disabled={!edit} onChange={(e) => updateSchoolingDetails('passout', e.target.value)}>
                                <option disabled>Year</option>
                                <option value="2016">2016</option>
                                <option value="2017">2017</option>
                                <option value="2018">2018</option>
                                <option value="2019">2019</option>
                                <option value="2020">2020</option>
                                <option value="2021">2021</option>
                            </Form.Select>
                        </InputGroup>
                    </Col>
                    <Col md={6} sm={12}>
                        <InputGroup className="mb-3">
                            <InputGroup.Text id="basic-addon1">CGPA</InputGroup.Text>
                            <FormControl
                                id="cgpa"
                                value={schooling.cgpa}
                                onChange={(e) => updateSchoolingDetails('cgpa', e.target.value)}
                                placeholder="Your 10th CGPA"
                                aria-label="SchoolName"
                                aria-describedby="basic-addon1"
                                disabled={!edit}
                            />
                        </InputGroup>
                    </Col>
                    <Col sm={12}>
                        <InputGroup className="mb-3">
                            <FormControl
                                id="location"
                                onChange={(e) => updateSchoolingDetails('loc', e.target.value)}
                                as='textarea'
                                value={schooling.loc}
                                placeholder="Your school address"
                                aria-label="address"
                                aria-describedby="basic-addon1"
                                disabled={!edit}
                            />
                        </InputGroup>
                    </Col>
                </Row>
            </Card>

            {/* collage details  */}
            <Card body style={{ padding: '10px', marginTop: '5px' }}>
                <p className="sub-heading">Pre University</p>
                <Row>
                    <Col sm={12}>
                        <InputGroup className="mb-3">
                            <InputGroup.Text id="basic-addon1">at</InputGroup.Text>
                            <FormControl
                                value={preGraduation.name}
                                onChange={(e) => updatepreGraduation('name', e.target.value)}
                                placeholder="University Name"
                                aria-label="University name"
                                aria-describedby="basic-addon1"
                                disabled={!edit}
                            />
                        </InputGroup>
                    </Col>
                    <Col md={6} sm={12}>
                        <InputGroup className="mb-3">
                            <InputGroup.Text id="basic-addon1">Passed Out</InputGroup.Text>
                            <Form.Select aria-label="Default select example" disabled={!edit} value={preGraduation.passout || preGraduation.passout !== '' ? preGraduation.passout : 'Year'} onChange={(e) => updatepreGraduation('passout', e.target.value)}>
                                <option disabled>Year</option>
                                <option value="2016">2016</option>
                                <option value="2017">2017</option>
                                <option value="2018">2018</option>
                                <option value="2019">2019</option>
                                <option value="2020">2020</option>
                                <option value="2021">2021</option>
                            </Form.Select>
                        </InputGroup>
                    </Col>
                    <Col md={6} sm={12}>
                        <InputGroup className="mb-3">
                            <InputGroup.Text id="basic-addon1">CGPA</InputGroup.Text>
                            <FormControl
                                value={preGraduation.cgpa}
                                onChange={(e) => updatepreGraduation('cgpa', e.target.value)}
                                placeholder="Overall CGPA"
                                aria-label="SchoolName"
                                aria-describedby="basic-addon1"
                                disabled={!edit}
                            />
                        </InputGroup>
                    </Col>
                    <Col sm={12}>
                        <InputGroup className="mb-3">
                            <FormControl
                                as='textarea'
                                value={preGraduation.loc}
                                onChange={(e) => updatepreGraduation('loc', e.target.value)}
                                placeholder="Address of University"
                                aria-label="address"
                                aria-describedby="basic-addon1"
                                disabled={!edit}
                            />
                        </InputGroup>
                    </Col>
                </Row>
            </Card>

            {/* Grauation details */}
            <Card body style={{ padding: '10px', marginTop: '5px' }}>
                <p className="sub-heading">Graduation</p>
                <Row>
                    <Col sm={12}>
                        <InputGroup className="mb-3">
                            <InputGroup.Text id="basic-addon1">at</InputGroup.Text>
                            <FormControl
                                value={graduation.name}
                                onChange={(e) => updateGraduation('name', e.target.value)}
                                placeholder="University Name"
                                aria-label="University name"
                                aria-describedby="basic-addon1"
                                disabled={!edit}
                            />
                        </InputGroup>
                    </Col>
                    {edit ?
                        <Col sm={12}>
                            <Accordion defaultActiveKey="0">
                                <Accordion.Item eventKey="0">
                                    <Accordion.Header>CGPA</Accordion.Header>
                                    <Accordion.Body>
                                        <Row>
                                            <Col md={6} sm={12}>
                                                <InputGroup className="mb-3">
                                                    <InputGroup.Text id="basic-addon1">E1/SEM1</InputGroup.Text>
                                                    <FormControl
                                                        defaultValue={graduation.allcgpa ? graduation.allcgpa['0'] : ''}
                                                        onChange={(e) => calculateAverageCgpa('0', e.target.value)}
                                                        placeholder="CGPA"
                                                        aria-label="SchoolName"
                                                        aria-describedby="basic-addon1"
                                                        disabled={!edit}
                                                    />
                                                </InputGroup>
                                            </Col>
                                            <Col md={6} sm={12}>
                                                <InputGroup className="mb-3">
                                                    <InputGroup.Text id="basic-addon1">E1/SEM2</InputGroup.Text>
                                                    <FormControl
                                                        defaultValue={graduation.allcgpa ? graduation.allcgpa['1'] : ''}
                                                        onChange={(e) => calculateAverageCgpa('1', e.target.value)}
                                                        placeholder="CGPA"
                                                        aria-label="SchoolName"
                                                        aria-describedby="basic-addon1"
                                                        disabled={!edit}
                                                    />
                                                </InputGroup>
                                            </Col>
                                            <Col md={6} sm={12}>
                                                <InputGroup className="mb-3">
                                                    <InputGroup.Text id="basic-addon1">E2/SEM1</InputGroup.Text>
                                                    <FormControl
                                                        defaultValue={graduation.allcgpa ? graduation.allcgpa['2'] : ''}
                                                        onChange={(e) => calculateAverageCgpa('2', e.target.value)}
                                                        placeholder="CGPA"
                                                        aria-label="SchoolName"
                                                        aria-describedby="basic-addon1"
                                                        disabled={!edit}
                                                    />
                                                </InputGroup>
                                            </Col>
                                            <Col md={6} sm={12}>
                                                <InputGroup className="mb-3">
                                                    <InputGroup.Text id="basic-addon1">E2/SEM2</InputGroup.Text>
                                                    <FormControl
                                                        defaultValue={graduation.allcgpa ? graduation.allcgpa['3'] : ''}
                                                        onChange={(e) => calculateAverageCgpa('3', e.target.value)}
                                                        placeholder="CGPA"
                                                        aria-label="SchoolName"
                                                        aria-describedby="basic-addon1"
                                                        disabled={!edit}
                                                    />
                                                </InputGroup>
                                            </Col>
                                            <Col md={6} sm={12}>
                                                <InputGroup className="mb-3">
                                                    <InputGroup.Text id="basic-addon1">E3/SEM1</InputGroup.Text>
                                                    <FormControl
                                                        defaultValue={graduation.allcgpa ? graduation.allcgpa['4'] : ''}
                                                        onChange={(e) => calculateAverageCgpa('4', e.target.value)}
                                                        placeholder="CGPA"
                                                        aria-label="SchoolName"
                                                        aria-describedby="basic-addon1"
                                                        disabled={!edit}
                                                    />
                                                </InputGroup>
                                            </Col>
                                            <Col md={6} sm={12}>
                                                <InputGroup className="mb-3">
                                                    <InputGroup.Text id="basic-addon1">E3/SEM2</InputGroup.Text>
                                                    <FormControl
                                                        defaultValue={graduation.allcgpa ? graduation.allcgpa['5'] : ''}
                                                        onChange={(e) => calculateAverageCgpa('5', e.target.value)}
                                                        placeholder="CGPA"
                                                        aria-label="SchoolName"
                                                        aria-describedby="basic-addon1"
                                                        disabled={!edit}
                                                    />
                                                </InputGroup>
                                            </Col>
                                            <Col md={6} sm={12}>
                                                <InputGroup className="mb-3">
                                                    <InputGroup.Text id="basic-addon1">E4/SEM1</InputGroup.Text>
                                                    <FormControl
                                                        defaultValue={graduation.allcgpa ? graduation.allcgpa['6'] : ''}
                                                        onChange={(e) => calculateAverageCgpa('6', e.target.value)}
                                                        placeholder="CGPA"
                                                        aria-label="SchoolName"
                                                        aria-describedby="basic-addon1"
                                                        disabled={!edit}
                                                    />
                                                </InputGroup>
                                            </Col>
                                            <Col md={6} sm={12}>
                                                <InputGroup className="mb-3">
                                                    <InputGroup.Text id="basic-addon1">E4/SEM2</InputGroup.Text>
                                                    <FormControl
                                                        defaultValue={graduation.allcgpa ? graduation.allcgpa['7'] : ''}
                                                        onChange={(e) => calculateAverageCgpa('7', e.target.value)}
                                                        placeholder="CGPA"
                                                        aria-label="SchoolName"
                                                        aria-describedby="basic-addon1"
                                                        disabled={!edit}
                                                    />
                                                </InputGroup>
                                            </Col>
                                        </Row>
                                    </Accordion.Body>
                                </Accordion.Item>
                            </Accordion>
                            <br />
                        </Col> :
                        <InputGroup className="mb-3">
                            <InputGroup.Text id="basic-addon1">CGPA</InputGroup.Text>
                            <FormControl
                                value={graduation.cgpa}
                                placeholder="Overall CGPA"
                                aria-label="SchoolName"
                                aria-describedby="basic-addon1"
                                disabled
                            />
                        </InputGroup>}
                    <Col sm={12}>
                        <InputGroup className="mb-3">
                            <FormControl
                                as='textarea'
                                value={graduation.loc}
                                onChange={(e) => updateGraduation('loc', e.target.value)}
                                placeholder="Address of University"
                                aria-label="address"
                                aria-describedby="basic-addon1"
                                disabled={!edit}
                            />
                        </InputGroup>
                    </Col>
                </Row>
            </Card>
        </div>
    );
}

export default EducationDetails;