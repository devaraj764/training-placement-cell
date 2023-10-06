import React, { useState, useEffect } from 'react';
import { Row, Col, Nav, Spinner } from 'react-bootstrap';
import axios from '../../axios';
import ProfileBanner from './ProfileBanner.js';
import PersonalProfile from './PersonalProfile.js';
import EducationDetails from './EducationDetails.js';
import Skills from './Skills.js';
import SocialMedia from './SocialMedia';
import Hobbies from './Hobbies.js';
import Projects from './Projects.js';
import Internships from './Internships.js';
import Certifications from './Certifications.js';
import Achievements from './Achievements.js';
import useUnsavedChangesWarning from '../helpers/useUnsavedChangesWarning.js';
import Toast from '../helpers/Toast.js';
import { BsPatchCheckFill } from 'react-icons/bs';
import { withRouter } from 'react-router-dom';
import { Helmet } from 'react-helmet'


const Profile = (props) => {
    const [Token, setToken] = useState(null);
    const [edit, setEdit] = useState(false);
    const [profileData, setprofileData] = useState(null);
    const [updatedProfile, setupdatedProfile] = useState({});
    const [loader, setloader] = useState(false);

    const [toast, setToast] = useState(false);

    useEffect(() => {
        if (props.location.search === '?edit=true') {
            setEdit(true);
        } else {
            setEdit(false);
        }
    }, [props.location])

    useEffect(() => {
        const token = localStorage.getItem('auth-token');
        setToken(token)
        if (!token) {
            props.history.push('/login')
        }
    }, [Token, props.history]);

    useEffect(() => {
        const url = '/students/mydata'
        axios.get(url, {
            headers: {
                "auth-token": localStorage.getItem('auth-token')
            }
        }).then((res) => {
            setprofileData(res.data)
        }).catch((err) => {
            if (!err.request.data) Logout();
        });
    }, []);


    const handleChanges = async () => {
        if (isDirty) {
            setPristine();
            setloader(true);
            const url = '/students/'
            await axios.patch(url, updatedProfile, {
                headers: {
                    "auth-token": localStorage.getItem('auth-token')
                }
            }).then((res) => {
                setloader(false);
                setToast(true);
            }).catch((err) => {
                setloader(false);
                console.log(err)
            })
        }
        props.history.push('/dashboard/profile');
    }

    const Logout = () => {
        setToken('')
        localStorage.removeItem('auth-token')
    }

    const [Prompt, setDirty, setPristine, isDirty] = useUnsavedChangesWarning();

    // Tabs code
    const [tab, setTab] = useState(0);
    return (
        <>
            <Helmet>
                <title>Student Profile | TPC</title>
            </Helmet>
            <div className="profile">
                <Row className="justify-content-md-center">
                    <Col xs={12} lg="8">
                        <ProfileBanner isDirty={isDirty} setPristine={setPristine} setDirty={setDirty} handleChanges={handleChanges} loader={loader} edit={edit} setEdit={setEdit} logout={Logout} profileData={profileData} updatedProfile={updatedProfile} setupdatedProfile={setupdatedProfile} />
                        <br />
                        <Nav fill variant="pills" defaultActiveKey={tab}>
                            <Nav.Item>
                                <Nav.Link eventKey="0" onClick={() => setTab(0)}>Personal</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="1" onClick={() => setTab(1)}>Skills</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="2" onClick={() => setTab(2)}>Education</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="3" onClick={() => setTab(3)}>Feats</Nav.Link>
                            </Nav.Item>
                        </Nav>
                        <hr />
                        {
                            tab === 0
                                ?
                                <>
                                    {profileData ?
                                        <>
                                            <PersonalProfile setDirty={setDirty} edit={edit} profileData={profileData} updatedProfile={updatedProfile} setupdatedProfile={setupdatedProfile} />
                                            <Hobbies setDirty={setDirty} edit={edit} profileData={profileData} updatedProfile={updatedProfile} setupdatedProfile={setupdatedProfile} />
                                            <SocialMedia setDirty={setDirty} edit={edit} profileData={profileData} updatedProfile={updatedProfile} setupdatedProfile={setupdatedProfile} />
                                        </>
                                        : <div style={{ minHeight: '20vh', textAlign: 'center' }}>
                                            <center style={{ marginTop: '80px' }}>
                                                <Spinner size='xl' animation='grow' /><br /><br />
                                                Retrieving data...
                                            </center>
                                        </div>
                                    }
                                </>
                                :
                                tab === 1 ?
                                    <>
                                        <Skills setPristine={setPristine} setDirty={setDirty} edit={edit} profileData={profileData} updatedProfile={updatedProfile} setupdatedProfile={setupdatedProfile} />
                                    </>
                                    :
                                    tab === 2 ?
                                        <>
                                            <EducationDetails setDirty={setDirty} edit={edit} profileData={profileData} updatedProfile={updatedProfile} setupdatedProfile={setupdatedProfile} />
                                        </>
                                        :
                                        tab === 3 ?
                                            <>
                                                <Projects setPristine={setPristine} setDirty={setDirty} edit={edit} profileData={profileData} updatedProfile={updatedProfile} setupdatedProfile={setupdatedProfile} />
                                                <Internships setPristine={setPristine} setDirty={setDirty} edit={edit} profileData={profileData} updatedProfile={updatedProfile} setupdatedProfile={setupdatedProfile} />
                                                <Certifications setPristine={setPristine} setDirty={setDirty} edit={edit} profileData={profileData} updatedProfile={updatedProfile} setupdatedProfile={setupdatedProfile} />
                                                <Achievements setPristine={setPristine} setDirty={setDirty} edit={edit} profileData={profileData} updatedProfile={updatedProfile} setupdatedProfile={setupdatedProfile} />
                                            </> : null

                        }
                    </Col>
                </Row>
                {Prompt}
                <Toast value={toast} callback={setToast}>
                    <BsPatchCheckFill size={18} style={{ color: '#32CD32' }} /> &nbsp; Changes Saved
                </Toast>
            </div>
        </>
    )
}

export default withRouter(Profile)