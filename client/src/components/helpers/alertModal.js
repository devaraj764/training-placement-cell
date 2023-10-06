import React, { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap'

const AlertModal = ({ value, callback, setPristine }) => {
    const [show, setshow] = useState(false);

    useEffect(() => {
        if (value === true) {
            setshow(true)
        }
    }, [value]);

    const reloadPage = () => {
        setPristine();
        setshow(false);
        callback(false);
        setTimeout(() => {
            window.location.replace('/dashboard/profile');
        }, 500)
    }
    return (

        <div>
            <Modal show={show} onHide={() => setshow(false)}>
                <div style={{ padding: '20px' }}>
                    <h6>You have unsaved changes, Are you sure want to cancel?</h6>
                    <div style={{ float: 'right', marginTop: '20px' }}>
                        <Button variant="outline-primary" onClick={() => { setshow(false); callback(false) }} style={{ marginRight: '20px' }}>No</Button>
                        <Button variant='primary' onClick={reloadPage}>Yes</Button>
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default AlertModal;