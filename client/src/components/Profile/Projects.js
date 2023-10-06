import React, { useState, useEffect } from 'react'
import { Card, Form, Accordion, Button } from 'react-bootstrap';
import { FiLink } from 'react-icons/fi'
import { MdDelete } from 'react-icons/md'

const Projects = (props) => {
    const [addNew, setaddNew] = useState(false);
    const [projects, setprojects] = useState([]);
    const [newProject, setnewProject] = useState({
        title: '',
        description: '',
        technologies: '',
        link: '',
    });

    useEffect(() => {
        setprojects(props.profileData.projects ? props.profileData.projects : []);
    }, [props.profileData]);

    const addProject = () => {
        props.setDirty()
        setnewProject({
            title: '',
            description: '',
            technologies: '',
            link: '',
        })
        setprojects([...projects, newProject]);
        props.setupdatedProfile({ ...props.updatedProfile, projects: [...projects, newProject] });
        setaddNew(false);
    }

    const updateProject = (title, key, value) => {
        props.setDirty()
        const index = projects.findIndex(project => project.title === title);
        const newProjects = [...projects];
        newProjects[index] = {
            ...newProjects[index],
            [key]: value
        }
        setprojects(newProjects);
        props.setupdatedProfile({ ...props.updatedProfile, projects: newProjects });
    }

    const deleteProject = (x) => {
        props.setDirty()
        setprojects(projects.filter(project => project.title !== x));
        props.setupdatedProfile({ ...props.updatedProfile, projects: projects.filter(project => project.title !== x) });
    }

    return (
        <div className="Projects">
            <p className="heading">Projects</p>
            <p className="message">Add your Projects and team members</p>
            <Card body style={{ padding: '10px', fontSize: '14px' }}>
                {
                    props.edit && addNew ?
                        <>
                            <Form.Label htmlFor="title">Project Title :</Form.Label>
                            <Form.Control
                                value={newProject.title}
                                onChange={(e) => { setnewProject({ ...newProject, title: e.target.value }); props.setDirty() }}
                                as='input'
                                type='text'
                                id='title'
                                placeholder="Your project title"
                            />
                            <br />
                            <Form.Label htmlFor="description">Describe your project :</Form.Label>
                            <Form.Control
                                value={newProject.description}
                                onChange={(e) => { setnewProject({ ...newProject, description: e.target.value }); props.setDirty() }}
                                as='textarea'
                                roes={3}
                                id='description'
                                placeholder="Describe your project...."
                            />
                            <br />
                            <Form.Label htmlFor="links">Technologies used :</Form.Label>
                            <Form.Control
                                value={newProject.technologies}
                                onChange={(e) => { setnewProject({ ...newProject, technologies: e.target.value }); props.setDirty() }}
                                as='input'
                                type='text'
                                id='links'
                                placeholder="Technologies used in this project"
                            />
                            <br />
                            <Form.Label htmlFor="links">External link :</Form.Label>
                            <Form.Control
                                value={newProject.link}
                                onChange={(e) => { setnewProject({ ...newProject, link: e.target.value }); props.setDirty() }}
                                as='input'
                                type='text'
                                id='links'
                                placeholder="paste video or document link..(Optional)"
                            />
                        </>
                        :
                        <Accordion>
                            {/* for every project */}
                            {projects.length === 0 ?
                                <p style={{ textAlign: 'center', width: '100%', color: 'gray' }}> No Projects Available!<br /> Try to add new Projects...</p>
                                : projects.map((project, index) => {
                                    return (
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }} key={index}>
                                            {
                                                props.edit ?
                                                    <span onClick={() => deleteProject(project.title)} style={{ marginRight: '10px', color: 'tomato', cursor: 'pointer' }}><MdDelete size={24} /></span> : null
                                            }
                                            <Accordion.Item style={{ width: '100%' }} eventKey={index}>
                                                <Accordion.Header>
                                                    {project.title}
                                                </Accordion.Header>
                                                <Accordion.Body>
                                                    {
                                                        !props.edit ?
                                                            project.link !== '' ? <a href={project.link} target="_blank" rel="noopener noreferrer" style={{ float: 'right', marginBottom: "10px", textDecoration: 'none' }}><FiLink size={14} />&nbsp;know more</a> : null
                                                            :
                                                            <Form.Control
                                                                type="text"
                                                                size='sm'
                                                                onChange={(e) => { updateProject(project.title, 'link', e.target.value) }}
                                                                defaultValue={project.link}
                                                                placeholder="paste video or document link here"
                                                                style={{ marginBottom: "10px" }}
                                                            />
                                                    }
                                                    <Form.Control
                                                        as='textarea'
                                                        rows={3}
                                                        onChange={(e) => { updateProject(project.title, 'description', e.target.value) }}
                                                        defaultValue={project.description}
                                                        placeholder="Enter your project description...."
                                                        style={{ fontSize: '14px', marginBottom: '10px' }}
                                                        disabled={!props.edit}

                                                    />
                                                    <Form.Control
                                                        type="text"
                                                        size='sm'
                                                        onChange={(e) => { updateProject(project.title, 'technologies', e.target.value) }}
                                                        defaultValue={project.technologies}
                                                        placeholder="Technologies used in this project"
                                                        disabled={!props.edit}
                                                    />
                                                </Accordion.Body>
                                            </Accordion.Item>
                                        </div>
                                    );
                                })}
                        </Accordion>
                }
                {
                    props.edit ?
                        addNew ?
                            <div style={{ marginTop: '20px' }}>
                                <Button size="sm" style={{ float: 'right', width: '100px', borderRadius: '25px' }} onClick={addProject}>push</Button>
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

export default Projects