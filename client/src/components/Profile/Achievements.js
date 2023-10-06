import React, { useState, useEffect } from 'react'
import { Card, Form, Accordion, Button } from 'react-bootstrap';
import { MdDelete } from 'react-icons/md'

const Achievements = (props) => {
    const [addNew, setaddNew] = useState(false)
    const [achievements, setAchievements] = useState([])
    const [newAchievement, setnewAchievement] = useState({
        title: '',
        description: '',
    });

    useEffect(() => {
        setAchievements(props.profileData.achievements
            ? props.profileData.achievements : [])
    }, [props.profileData]);

    const addAchievement = () => {
        props.setDirty();
        setAchievements([...achievements, newAchievement]);
        props.setupdatedProfile({ ...props.updatedProfile, achievements: [...achievements, newAchievement] });
        setaddNew(false);
    }

    const updateAchivement = (index, value) => {
        props.setDirty();
        let newAchievements = [...achievements];
        newAchievements[index] = {
            ...newAchievements[index],
            description: value
        }
        setAchievements(newAchievements);
        props.setupdatedProfile({ ...props.updatedProfile, achievements: newAchievements });
    }

    const deleteAchivement = (index) => {
        props.setDirty();
        setAchievements(achievements.filter((_, i) => i !== index));
        props.setupdatedProfile({ ...props.updatedProfile, achievements: achievements.filter((_, i) => i !== index) });
    }

    return (
        <div className="Achievements">
            <p className="heading">Achievements</p>
            <p className="message">Add your school and college level achievements.</p>
            <Card body style={{ padding: '10px', fontSize: '14px' }}>
                {
                    props.edit && addNew ?
                        <>
                            <Form.Label htmlFor="name">Achievement name :</Form.Label>
                            <Form.Control
                                defaultValue={newAchievement.title}
                                onChange={(e) => { setnewAchievement({ ...newAchievement, title: e.target.value }); props.setDirty() }}
                                as='input'
                                type='text'
                                id='name'
                                placeholder="Your achievement name"
                            />
                            <br />
                            <Form.Label htmlFor="description">Describe your achievement :</Form.Label>
                            <Form.Control
                                defaultValue={newAchievement.description}
                                onChange={(e) => { setnewAchievement({ ...newAchievement, description: e.target.value }); props.setDirty() }}
                                as='textarea'
                                roes={3}
                                id='description'
                                placeholder="Tell about your achievement...."
                            />
                        </>
                        :
                        <Accordion>
                            {achievements.length === 0 ? <p style={{ textAlign: 'center', width: '100%', color: 'gray' }}> No Achievements Available!<br /> Try to add new Achievements...</p> : achievements.map((achievement, index) => {
                                return <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }} key={index}>
                                    {
                                        props.edit ?
                                            <span onClick={() => deleteAchivement(index)} style={{ marginRight: '10px', color: 'tomato', cursor: 'pointer' }}><MdDelete size={24} /></span> : null
                                    }
                                    <Accordion.Item eventKey={index} style={{ width: '100%' }}>
                                        <Accordion.Header>
                                            {achievement.title}
                                        </Accordion.Header>
                                        <Accordion.Body>
                                            <Form.Control
                                                as='textarea'
                                                rows={3}
                                                defaultValue={achievement.description}
                                                onChange={(e) => { updateAchivement(index, e.target.value); props.setDirty() }}
                                                placeholder="Describe about your achievement...."
                                                style={{ fontSize: '14px', marginBottom: '10px' }}
                                                disabled={!props.edit}
                                            />
                                        </Accordion.Body>
                                    </Accordion.Item>
                                </div>
                            })}
                        </Accordion>
                }
                {
                    props.edit ?
                        addNew ?
                            <div style={{ marginTop: '20px' }}>
                                <Button size="sm" style={{ float: 'right', width: '100px', borderRadius: '25px' }} onClick={addAchievement}>push</Button>
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

export default Achievements