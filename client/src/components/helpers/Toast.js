import React, { useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap'

const Toast = ({ value, callback, children }) => {
    const [show, setShow] = useState(false);

    useEffect(() => {
        if (value === true) {
            setShow(true);
            setTimeout(() => setShow(false), 1000);
            callback(false);
        }
    }, [value, callback])
    
    return (
        <>
            <Modal show={show} onHide={() => setShow(false)} className="Toast">
                <Modal.Body>
                    {children}  
                </Modal.Body>
            </Modal>
        </>
    );
}

export default Toast