import React, { useState, useEffect } from 'react';
import { Row, Card, Accordion, Form, Col, Button } from 'react-bootstrap';
import { MdDelete } from 'react-icons/md'

const Skills = ({ edit, profileData, updatedProfile, setupdatedProfile, setDirty, setPristine }) => {
    const [addNew, setaddNew] = useState(false);
    const [hardSkills, sethardSkills] = useState([]);
    const [softSkills, setsoftSkills] = useState([]);
    const [newskill, setnewskill] = useState({
        name: '',
        level: 'beginner'
    });
    const [newTech, setnewTech] = useState({
        name: '',
        level: 'beginner',
        tools: ""
    });
    const [newSubject, setnewSubject] = useState({
        name: '',
        description: '',
    });
    const [newLanguage, setnewLanguage] = useState({
        name: '',
        level: 'beginner',
    });

    useEffect(() => {
        sethardSkills(profileData ? profileData.hardSkills ? profileData.hardSkills : [] : []);
        setsoftSkills(profileData ? profileData.softSkills ? profileData.softSkills : [] : []);
    }, [profileData]);

    const addHardSkill = (title) => {
        setDirty()
        if (title === 'Programming Languages') {
            let newhardSkills = hardSkills;
            newhardSkills[0] = {
                "title": "Programming Languages",
                "data": [
                    ...newhardSkills[0].data,
                    newskill
                ]
            }
            sethardSkills(newhardSkills);
            setupdatedProfile({ ...updatedProfile, hardSkills: newhardSkills });
            setaddNew(false)
        }
        if (title === 'Technologies') {
            let newhardSkills = hardSkills;
            newhardSkills[1] = {
                "title": "Technologies",
                "data": [
                    ...newhardSkills[1].data,
                    newTech
                ]
            }
            sethardSkills(newhardSkills);
            setupdatedProfile({ ...updatedProfile, hardSkills: newhardSkills });
            setaddNew(false)
        }
        if (title === 'Subjects') {
            let newhardSkills = hardSkills;
            newhardSkills[2] = {
                "title": "Subjects",
                "data": [
                    ...newhardSkills[2].data,
                    newSubject
                ]
            }
            sethardSkills(newhardSkills);
            setupdatedProfile({ ...updatedProfile, hardSkills: newhardSkills });
            setaddNew(false)
        }
    }

    const changeSkillLevel = (level, name, title) => {
        setDirty()
        if (title === 'Programming Languages') {
            let newhardSkills = hardSkills;
            const index = newhardSkills[0].data.findIndex(x => x.name === name);
            newhardSkills[0].data[index] = {
                "name": name,
                "level": level
            }
            sethardSkills(newhardSkills);
            setupdatedProfile({ ...updatedProfile, hardSkills: newhardSkills });
        }
        if (title === 'Technologies') {
            let newhardSkills = hardSkills;
            const index = newhardSkills[1].data.findIndex(x => x.name === name);
            newhardSkills[1].data[index] = {
                ...newhardSkills[1].data[index],
                "level": level
            }
            sethardSkills(newhardSkills);
            setupdatedProfile({ ...updatedProfile, hardSkills: newhardSkills });
        }
    }

    const changeTools = (tools, name) => {
        setDirty()
        let newhardSkills = hardSkills;
        const index = newhardSkills[1].data.findIndex(x => x.name === name);
        newhardSkills[1].data[index] = {
            ...newhardSkills[1].data[index],
            "tools": tools
        }
        sethardSkills(newhardSkills);
        setupdatedProfile({ ...updatedProfile, hardSkills: newhardSkills });
    }

    const changeDescription = (description, name) => {
        setDirty()
        let newhardSkills = hardSkills;
        const index = newhardSkills[2].data.findIndex(x => x.name === name);
        newhardSkills[2].data[index] = {
            ...newhardSkills[2].data[index],
            "description": description
        }
        sethardSkills(newhardSkills);
        setupdatedProfile({ ...updatedProfile, hardSkills: newhardSkills });
    }

    const addSoftSkill = (title) => {
        setDirty()
        if (title === 'Language Proficiency') {
            let newsoftSkills = softSkills;
            newsoftSkills[0] = {
                "title": "Language Proficiency",
                "data": [
                    ...newsoftSkills[0].data,
                    newLanguage
                ]
            }
            setsoftSkills(newsoftSkills);
            setupdatedProfile({ ...updatedProfile, softSkills: newsoftSkills });
            setaddNew(false)
        }
    }

    const changeLanguageLevel = (level, name) => {
        setDirty()
        let newsoftSkills = softSkills;
        const index = newsoftSkills[0].data.findIndex(x => x.name === name);
        newsoftSkills[0].data[index] = {
            "name": name,
            "level": level
        }
        setsoftSkills(newsoftSkills);
        setupdatedProfile({ ...updatedProfile, softSkills: newsoftSkills });
    }

    const changeSoftSkill = (level, title) => {
        setDirty()
        let newsoftSkills = softSkills;
        const index = newsoftSkills.findIndex(x => x.title === title);
        newsoftSkills[index] = {
            "title": title,
            "level": level
        }
        setsoftSkills(newsoftSkills);
        setupdatedProfile({ ...updatedProfile, softSkills: newsoftSkills });
    }

    const deleteHardSkill = (title, index) => {
        setDirty()
        if (title === 'Programming Languages') {
            let newhardSkills = hardSkills;
            newhardSkills[0] = {
                "title": "Programming Languages",
                "data": newhardSkills[0].data.filter((_, i) => i !== index)
            }
            sethardSkills(newhardSkills);
            setupdatedProfile({ ...updatedProfile, hardSkills: newhardSkills })
        }
        if (title === 'Technologies') {
            let newhardSkills = hardSkills;
            newhardSkills[1] = {
                "title": "Technologies",
                "data": newhardSkills[1].data.filter((_, i) => i !== index)
            }
            sethardSkills(newhardSkills);
            setupdatedProfile({ ...updatedProfile, hardSkills: newhardSkills })
        }
        if (title === 'Subjects') {
            let newhardSkills = hardSkills;
            newhardSkills[2] = {
                "title": "Subjects",
                "data": newhardSkills[2].data.filter((_, i) => i !== index)
            }
            sethardSkills(newhardSkills);
            setupdatedProfile({ ...updatedProfile, hardSkills: newhardSkills })
        }
    }

    const deleteSoftSkill = (index) => {
        setDirty()
        let newsoftSkills = softSkills;
        newsoftSkills[0] = {
            ...newsoftSkills[0],
            "data": newsoftSkills[0].data.filter((_, i) => i !== index)
        }
        setsoftSkills(newsoftSkills);
        setupdatedProfile({ ...updatedProfile, softSkills: newsoftSkills })
    }


    return (
        <div className="Skills">
            <p className="heading">Skills</p>
            <p className="message">Rate your skills according to your capability</p>
            {/* Hard Skills  */}
            <Card body style={{ padding: '10px' }}>
                <p className="sub-heading">Technical Skills</p>
                <Row>
                    <Accordion>
                        {hardSkills ? hardSkills.map((skill, index) => {
                            return <Accordion.Item eventKey={index} key={index}>
                                <Accordion.Header>{skill.title}</Accordion.Header>
                                <Accordion.Body>
                                    {skill ? skill.data.map((item, index) => {
                                        return (<div key={index}>
                                            <div>
                                                <div className="skill">
                                                    <p>
                                                        {
                                                            edit ?
                                                                <span onClick={() => deleteHardSkill(skill.title, index)} style={{ marginRight: '10px', color: 'tomato', cursor: 'pointer' }}><MdDelete size={24} /></span>
                                                                : null
                                                        }
                                                        {item.name}
                                                    </p>
                                                    <div>
                                                        {item.description !== undefined ? <Form.Control defaultValue={item.description} placeholder="Describe topics you know" onChange={(e) => changeDescription(e.target.value, item.name)} type='text' className='skillVal' style={{ flexWrap: 'wrap', maxWidth: '400px' }} size='sm' aria-label="Default select example" disabled={!edit} /> :
                                                            <Form.Select onChange={(e) => changeSkillLevel(e.target.value, item.name, skill.title)} className="skillVal" size='sm' value={item.level} aria-label="Default select example" disabled={!edit}>
                                                                <option value="Beginner">Beginner</option>
                                                                <option value="Moderate">Moderate</option>
                                                                <option value="Advanced">Advanced</option>
                                                            </Form.Select>}
                                                    </div>
                                                </div>
                                                {item.tools !== undefined ? <Form.Control
                                                    size={'sm'}
                                                    type='text'
                                                    onChange={(e) => changeTools(e.target.value, item.name)}
                                                    defaultValue={item.tools === undefined || item.tools === '' ? '' : item.tools}
                                                    placeholder="Frameworks you are specialized in.."
                                                    style={{ marginBottom: '30px', marginTop: '10px', minHeight: '50px' }}
                                                    disabled={!edit}
                                                /> : null}
                                            </div>
                                        </div>)
                                    }) : null}<br />
                                    {edit ? addNew ? <Button variant="light" onClick={() => { setaddNew(false); setPristine() }} style={{ fontSize: '14px !important', minWidth: '100px', borderRadius: '25px', marginBottom: '20px' }} size='sm'>cancel</Button> : <Button style={{ fontSize: '14px !important', minWidth: '100px', borderRadius: '25px', marginBottom: '20px' }} size='sm' onClick={() => setaddNew(true)}>+ Add</Button> : null}
                                    {addNew ? <Col lg={12}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                            <Form.Control
                                                onChange={(e) => { setDirty(); skill.title === 'Programming Languages' ? setnewskill({ ...newskill, name: e.target.value }) : skill.title === 'Subjects' ? setnewSubject({ ...newSubject, name: e.target.value }) : setnewTech({ ...newTech, name: e.target.value }) }}
                                                value={skill.title === 'Programming Languages' ? newskill.name : skill.title === 'Subjects' ? newSubject.name : newTech.name}
                                                type="text"
                                                style={{ marginRight: '10px' }}
                                                placeholder={skill.title === 'Programming Languages' ? 'Language' : skill.title === 'Subjects' ? 'Subject' : 'technology'}
                                            />
                                            {skill.title === 'Technologies' ? <Form.Control
                                                style={{ marginRight: '10px' }}
                                                onChange={(e) => { setnewTech({ ...newTech, tools: e.target.value }); setDirty() }}
                                                value={newTech.tools}
                                                type="text"
                                                placeholder='specialization'
                                            /> : null}
                                            {skill.title === 'Subjects' ? <Form.Control style={{ marginRight: '10px' }} value={newSubject.description} type='text' placeholder='Describe topics you know' onChange={(e) => { setnewSubject({ ...newSubject, description: e.target.value }); setDirty(); }} />
                                                : <Form.Select style={{ marginRight: '10px' }} value={newskill.level} onChange={(e) => { setnewskill({ ...newskill, level: e.target.value }); setDirty() }} aria-label="Default select example">
                                                    <option value="Beginner">Beginner</option>
                                                    <option value="Moderate">Moderate</option>
                                                    <option value="Advanced">Advanced</option>
                                                </Form.Select>}
                                            <Button style={{ fontSize: '14px !important', minWidth: '100px' }} onClick={() => addHardSkill(skill.title)}>Add</Button>
                                        </div>
                                    </Col> : null}
                                </Accordion.Body>
                            </Accordion.Item>
                        }) : null}
                    </Accordion>
                </Row>
            </Card>

            {/* Soft Skills  */}
            <Card body style={{ padding: '10px', marginTop: '5px' }}>
                <p className="sub-heading">Soft Skills</p>
                <Row>
                    <Accordion>
                        {softSkills ? softSkills.map((skill, index) => {
                            return skill.title === 'Language Proficiency' ? <Accordion.Item eventKey={index} key={index}>
                                <Accordion.Header>{skill.title}</Accordion.Header>
                                <Accordion.Body>
                                    {skill.data.map((item, index) => {
                                        return <div className="skill" key={index}>
                                            <p>
                                                {
                                                    edit ?
                                                        <span onClick={() => deleteSoftSkill(index)} style={{ marginRight: '10px', color: 'tomato', cursor: 'pointer' }}><MdDelete size={24} /></span>
                                                        : null
                                                }
                                                {item.name}
                                            </p>
                                            <Form.Select className="skillVal" size='sm' onChange={(e) => changeLanguageLevel(e.target.value, item.name)} value={item.level} aria-label="Default select example" disabled={!edit}>
                                                <option value="Beginner">Beginner</option>
                                                <option value="Medium">Moderate</option>
                                                <option value="Advanced">Advanced</option>
                                            </Form.Select>
                                        </div>
                                    })}
                                    <br />
                                    {edit ? addNew ? <Button variant="light" onClick={() => { setaddNew(false); setPristine() }} style={{ fontSize: '14px !important', minWidth: '100px', borderRadius: '25px', marginBottom: '20px' }} size='sm'>cancel</Button> : <Button variant="primary" size='sm' style={{ fontSize: '14px !important', minWidth: '100px', borderRadius: '25px', marginBottom: '20px' }} onClick={() => setaddNew(true)}>+ Add</Button> : null}
                                    {addNew ? <Col lg={12}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                            <Form.Control
                                                onChange={(e) => { setnewLanguage({ ...newLanguage, name: e.target.value }); setDirty() }}
                                                value={newLanguage.name}
                                                type="text"
                                                placeholder='Language'
                                                style={{ marginRight: '10px' }}
                                            />
                                            <Form.Select style={{ marginRight: '10px' }} defaultValue={newskill.level} onChange={(e) => { setnewLanguage({ ...newLanguage, level: e.target.value }); setDirty() }} aria-label="Default select example">
                                                <option value="Beginner">Beginner</option>
                                                <option value="Moderate">Moderate</option>
                                                <option value="Advanced">Advanced</option>
                                            </Form.Select>
                                            <Button style={{ fontSize: '14px !important', minWidth: '100px' }} onClick={() => addSoftSkill(skill.title)}>Add</Button>
                                        </div>
                                    </Col> : null}
                                </Accordion.Body>
                            </Accordion.Item> : <div className='softSkill' key={index}>
                                <p style={{ fontSize: '14px' }}>{skill.title}</p>
                                <center>
                                    <Form.Select className="skillVal" size='sm' onChange={(e) => changeSoftSkill(e.target.value, skill.title)} value={skill.level} style={{ maxWidth: '120px', height: '35px', alignItems: 'center', marginTop: '10px' }} aria-label="Default select example" disabled={!edit}>
                                        <option value="Beginner">Beginner</option>
                                        <option value="Moderate">Moderate</option>
                                        <option value="Advanced">Advanced</option>
                                    </Form.Select>
                                </center>
                            </div>
                        }) : null}
                    </Accordion>
                </Row>
            </Card>
        </div>
    )
}

export default Skills;