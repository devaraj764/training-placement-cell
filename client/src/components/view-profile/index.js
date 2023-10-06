import React, { useEffect, useState, useRef } from 'react'
import { Row, Col, Image, Spinner } from 'react-bootstrap';
import axios, { uri } from '../../axios';
import { withRouter } from 'react-router-dom';
import { useReactToPrint } from 'react-to-print';
import { Helmet } from 'react-helmet'


const ViewProfile = (props) => {
    const [profile, setProfile] = useState(null);
    const [err, setErr] = useState(false);

    useEffect(() => {
        const url = '/students/view-profile/' + props.match.params.id
        axios.get(url, {
            headers: {
                "auth-token": localStorage.getItem('admin-token') || localStorage.getItem('auth-token')
            }
        }).then((res) => {
            setProfile(res.data)
        }).catch((err) => {
            console.log(err)
            setErr(err.message)
        });
    }, []);

    const componentRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });

    return (

        !err ?
            !profile ?
                <div style={{ marginTop: '20px', textAlign: 'center', fontSize: '16px', fontWeight: 'bold' }}><Spinner animation="border" size='sm' /> &nbsp; Loading Data...</div>
                :
                <>
                    <Helmet>
                        <title>{profile.name} | Profile</title>
                    </Helmet>
                    <Row className="view-profile justify-content-md-center" ref={componentRef}>
                        <Col md={8}>
                            <div className="header">
                                <div className="header-left">
                                    <p className="user-name">{profile.name}</p>
                                    <p>{profile.email}</p>
                                </div>
                                <div className="header-right">
                                    <Image src={profile.imageUrl ? `${uri}${profile.imageUrl}` : 'https://t4.ftcdn.net/jpg/00/65/77/27/360_F_65772719_A1UV5kLi5nCEWI0BNLLiFaBPEkUbv5Fv.jpg'} alt="profile-image" height="100px" style={{ borderRadius: '10px' }} />
                                </div>
                            </div>
                            <hr />
                            <main>
                                {/* About Me */}
                                {profile.bio || profile.hobbies.length > 0 || !profile.privacy ?
                                    <div className="section">
                                        <div className="section-title" >
                                            <p className="heading">About Me</p>
                                        </div>
                                        <div className="section-content" >
                                            <div className="description">
                                                {profile.bio ? <p>{profile.bio}</p> : null}
                                                {
                                                    profile.privacy ? null :
                                                        <div style={{ marginBottom: '15px' }}>
                                                            {profile.contactNumber ? <p className="sub-heading">Contact Number: <i style={{ fontSize: '14px', fontWeight: '500', divor: '#6b818b' }}>+91 {profile.contactNumber}</i></p> : null}
                                                            {profile.dob ? <p className="sub-heading">Date of Birth: <i style={{ fontSize: '14px', fontWeight: '500', divor: '#6b818b' }}>{profile.dob}</i></p> : null}
                                                            {profile.address ? <p className="sub-heading">Address: <i style={{ fontSize: '14px', fontWeight: '500', divor: '#6b818b' }}>{profile.address}</i></p> : null}
                                                        </div>
                                                }
                                                {profile.hobbies.length > 0 ?
                                                    <>
                                                        <p className="sub-heading">My Hobbies</p>
                                                        <p>{profile.hobbies.map((hobbie, id) => (<span key={id}>{hobbie}, </span>))}</p>
                                                    </>
                                                    : null
                                                }
                                            </div>
                                        </div>
                                    </div> : null
                                }
                                {/* Education */}
                                {profile.graduation.name !== '' || profile.preGraduation.name !== '' || profile.schooling.name !== '' ?

                                    <div className="section">
                                        <div className="section-title" >
                                            <p className="heading">EDUCATION</p>
                                        </div>
                                        <div className="section-content" >
                                            <div className="description">
                                                {profile.graduation.name ?
                                                    <>
                                                        <p className="sub-heading">B.Tech, Computer Science & Engineering</p>
                                                        <p>{profile.graduation.name}</p>
                                                        <p>CGPA : {profile.graduation.cgpa}</p>
                                                        <p>{profile.graduation.loc}</p>
                                                    </>
                                                    : null
                                                }
                                                {
                                                    profile.preGraduation.name ?
                                                        <>
                                                            <p className="sub-heading" style={{ marginTop: '20px' }}>Pre - University</p>
                                                            <p>{profile.preGraduation.name}</p>
                                                            <p>Passout Year: {profile.preGraduation.passout}</p>
                                                            <p>CGPA : {profile.preGraduation.cgpa}</p>
                                                            <p>{profile.preGraduation.loc}</p>
                                                        </>
                                                        : null
                                                }
                                                {
                                                    profile.schooling.name ?
                                                        <>
                                                            <p className="sub-heading" style={{ marginTop: '20px' }}>Schooling</p>
                                                            <p>{profile.schooling.name}</p>
                                                            <p>Passout Year: {profile.schooling.passout}</p>
                                                            <p>CGPA : {profile.schooling.cgpa}</p>
                                                            <p>{profile.schooling.loc}</p>
                                                        </>
                                                        : null
                                                }
                                            </div>
                                        </div>
                                    </div> : null
                                }
                                {/* Technical Skills */}
                                {profile.hardSkills.length > 0 ?
                                    <div className="section">
                                        <div className="section-title" >
                                            <p className="heading">Technical Skills</p>
                                        </div>
                                        <div className="section-content" >
                                            <div className="description">
                                                {
                                                    profile.hardSkills.map((skill, id) => {
                                                        return (
                                                            skill.data.length > 0 ?
                                                                <div key={id} style={{ marginBottom: '15px' }}>
                                                                    <p className="sub-heading">{skill.title}</p>
                                                                    {
                                                                        skill.data.map((dataItem, id) => (
                                                                            <p key={id}>{dataItem.name}
                                                                                {dataItem.level ? <> : <i>{dataItem.level}{dataItem.tools ? ` - ${dataItem.tools}` : null}</i></> : null}
                                                                                {dataItem.description ? <><br /> <span style={{ marginLeft: '10px' }}>{dataItem.description}</span></> : null}
                                                                            </p>
                                                                        ))
                                                                    }
                                                                </div>
                                                                : null
                                                        )
                                                    })
                                                }
                                            </div>
                                        </div>
                                    </div> : null}
                                {/* SoftSkills */}
                                {
                                    profile.softSkills.length > 0 ?
                                        <div className="section">
                                            <div className="section-title" >
                                                <p className="heading">Soft Skills</p>
                                            </div>
                                            <div className="section-content" >
                                                <div className="description">
                                                    {
                                                        profile.softSkills.map((skill, id) => {
                                                            if (skill.title === 'Language Proficiency') {
                                                                return (
                                                                    skill.data.length > 0 ?
                                                                        <div key={id} style={{ marginBottom: '20px' }}>
                                                                            <p className="sub-heading">{skill.title}</p>

                                                                            {skill.data.map((dataItem, id) => (
                                                                                <p key={id}>{dataItem.name}
                                                                                    {dataItem.level ? <> : <i>{dataItem.level}</i></> : null}
                                                                                </p>
                                                                            ))}
                                                                        </div> : null
                                                                )
                                                            }
                                                            return (
                                                                <div key={id} style={{ marginBottom: '20px' }}>
                                                                    <p className="sub-heading">{skill.title} : <i style={{ fontSize: '14px', fontWeight: '500', divor: '#6b818b' }}>{skill.level}</i></p>
                                                                </div>
                                                            )
                                                        })
                                                    }

                                                </div>
                                            </div>
                                        </div> : null
                                }
                                {/* projects */}
                                {profile.projects.length > 0 ?
                                    <div className="section">
                                        <div className="section-title" >
                                            <p className="heading">Projects</p>
                                        </div>
                                        <div className="section-content" >
                                            <div className="description">
                                                {profile.projects.map((project) => (
                                                    <div style={{ marginBottom: '20px' }} key={project.title}>
                                                        <p className="sub-heading">{project.title}</p>
                                                        <p>{project.description}</p>
                                                        <p>Techinologies used : {project.technologies}</p>
                                                        {project.link ? <a href={project.link}>Know more..</a> : null}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div> : null
                                }
                                {/* Intenships */}
                                {profile.internships.length > 0 ?
                                    <div className="section">
                                        <div className="section-title" >
                                            <p className="heading">Internships</p>
                                        </div>
                                        <div className="section-content" >
                                            <div className="description">
                                                {profile.internships.map((internship) => (
                                                    <div style={{ marginBottom: '20px' }} key={internship.organization}>
                                                        <p className="sub-heading">Role : {internship.role}</p>
                                                        <p>Company : {internship.organization}</p>
                                                        <p>Duration : {internship.duration} months</p>
                                                        <p>Status : {internship.status}</p>
                                                        <p>{internship.status === 'working' ? `Joined on ${internship.startDate}` : `${internship.startDate} - ${internship.endDate}`}</p>
                                                        {profile.certificate ? <a href={profile.certificate}>View certificate</a> : null}
                                                    </div>
                                                ))
                                                }
                                            </div>
                                        </div>
                                    </div> : null}
                                {/* Certifications */}
                                {profile.certifications.length > 0 ?
                                    <div className="section">
                                        <div className="section-title" >
                                            <p className="heading">Certifications</p>
                                        </div>
                                        <div className="section-content" >
                                            <div className="description">
                                                {profile.certifications.map((item) => (
                                                    <div style={{ marginBottom: '20px' }} key={item.title}>
                                                        <p className="sub-heading">{item.title}</p>
                                                        <p>Certiified by {item.organization}</p>
                                                        <p>Status : {item.status}</p>
                                                        <p>{item.status === 'working' ? `Joined on ${item.startDate}` : `${item.startDate} - ${item.endDate}`}</p>
                                                        {item.link ? <a href={item.link}>View certificate</a> : null}
                                                    </div>
                                                ))
                                                }
                                            </div>
                                        </div>
                                    </div> : null}
                                {/* Achievements */}
                                {profile.achievements.length > 0 ?
                                    <div className="section">
                                        <div className="section-title" >
                                            <p className="heading">Achievements</p>
                                        </div>
                                        <div className="section-content" >
                                            <div className="description">
                                                {profile.achievements.map((project) => (
                                                    <div style={{ marginBottom: '20px' }} key={project.title}>
                                                        <p className="sub-heading">{project.title}</p>
                                                        <p>{project.description}</p>
                                                    </div>
                                                ))
                                                }
                                            </div>
                                        </div>
                                    </div> : null}
                                {/* External Links */}
                                {profile.links.length > 0 ?
                                    <div className="section">
                                        <div className="section-title">
                                            <p className="heading">External Links & <br /> Work Samples</p>
                                        </div>
                                        <div className="section-content">
                                            <div className="description">
                                                {profile.links.map((link) => (
                                                    <div key={link} style={{ marginBottom: '20px' }}>
                                                        <p className="sub-heading">
                                                            {link.includes('github') ?
                                                                'Github' :
                                                                link.includes('linkedin') ?
                                                                    'LinkedIn' :
                                                                    link.includes('hackerrank') ? 'HackerRank' : link.includes('leetcode') ? 'LeetCode' : link.includes('youtube') ? 'YouTube' : 'Link'}</p>
                                                        <a href={link}>{link}</a>
                                                    </div>
                                                ))
                                                }
                                            </div>
                                        </div>
                                    </div> : null}
                            </main>
                        </Col>
                    </Row >
                    {props.id === props.match.params.id ? <Row className="download-resume justify-content-md-center">
                        <hr />
                        <p style={{ textAlign: 'center', width: '100%', color: '#3c4852', fontSize: '16px', fontWeight: '600', cursor: 'pointer' }} onClick={handlePrint}>Download Resume</p>
                    </Row> : null}
                </>
            :
            <div style={{ marginTop: '16px', textAlign: 'center', fontSize: '16px', fontWeight: 'bold' }}>Error Loading data...</div>
    )
}

export default withRouter(ViewProfile)