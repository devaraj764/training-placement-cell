import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Form, InputGroup, Button } from 'react-bootstrap';
import { SiLeetcode } from 'react-icons/si'
import { BsLink } from 'react-icons/bs';
import { MdOutlineCancel } from 'react-icons/md';
import { FaGithub, FaLinkedin, FaHackerrank, FaYoutube } from 'react-icons/fa';

const SocialMedia = ({ edit, profileData, updatedProfile, setupdatedProfile, setDirty }) => {
    const [addNew, setAddNew] = useState(false)
    const [newLinks, setnewLinks] = useState([]);
    const [link, setlink] = useState('');

    useEffect(() => {
        setnewLinks(profileData.links ? profileData.links : [])
    }, [profileData]);

    const addLink = () => {
        setDirty()
        setnewLinks([...newLinks, link]);
        setupdatedProfile({ ...updatedProfile, links: [...newLinks, link] });
        setAddNew(false);
        setlink('');
    }

    const removeLink = (link) => {
        setDirty()
        setnewLinks(newLinks.filter(l => l !== link))
        setupdatedProfile({ ...updatedProfile, links: newLinks.filter(l => l !== link) });
    }

    return (
        <div className="SocialMedia">
           <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height:'fit-content' }}>
                <div style={{margin:'0px'}}>
                    <p className="heading">External Links</p>
                    <p className="message">Add your links here</p>
                </div>
                {addNew ?
                    <Button variant="light" onClick={() => setAddNew(false)} style={{ minWidth: '100px', borderRadius: '10px' }} size='sm'>cancel</Button>
                    :
                    edit ?
                        <Button onClick={() => setAddNew(true)} style={{ minWidth: '100px', borderRadius: '10px' }} size='sm'>+ Link</Button>
                        : null
                }
            </div>
            <Card body style={{ padding: '10px' }}>
                <Row>
                    {addNew ? null : newLinks ? newLinks.length === 0 ?
                        <p style={{ textAlign: 'center', width: '100%', color: 'gray' }}> No Links Available!<br /> Try to add new links...</p>
                        :
                        newLinks.map((link, index) => {
                            return (
                                <Col key={index} md={6} sm={12}>
                                    <Card body className='linkField'>
                                        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                                            <i> {link.includes('github') ? <FaGithub size={20} /> : link.includes('linkedin') ? <FaLinkedin size={20} /> : link.includes('hackerrank') ? <FaHackerrank size={20} /> : link.includes('leetcode') ? <SiLeetcode size={20} /> : link.includes('youtube') ? <FaYoutube size={20} /> : <BsLink size={20} />}</i>
                                            <a href={link} rel="noopener noreferrer" target="_blank" style={{overflow: 'hidden', whiteSpace: 'nowrap', textOverflow:'ellipsis'}}>{link}</a>
                                        </div>
                                        {edit ? <i><MdOutlineCancel size={16} style={{ color: '#3c4852', marginLeft: '5px', cursor: 'pointer' }} onClick={() => removeLink(link)} /></i> : null}
                                    </Card>
                                </Col>
                            );
                        }) : null
                    }
                    {addNew ?
                        <Col lg={12}>
                            <InputGroup className="mb-3">
                                <Form.Control
                                    onChange={(e) => { setlink(e.target.value); setDirty() }}
                                    value={link}
                                    type="text"
                                    placeholder="Place your link here.."
                                />
                                <Button variant="secondary" style={{ minWidth: '100px' }} onClick={addLink}>Add</Button>
                            </InputGroup>
                        </Col>
                        : null
                    }
                </Row>
            </Card>
        </div>
    )
}

export default SocialMedia;