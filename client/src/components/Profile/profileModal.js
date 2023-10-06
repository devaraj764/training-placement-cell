import React, { useState, useEffect } from 'react';
import { Modal, Button, Image, Row, Col } from 'react-bootstrap';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import axios from '../../axios';

const ProfileModal = ({ src, value, callback, setcropimg, setEdit, history }) => {
    const [show, setshow] = useState(false);

    const [crop, setCrop] = useState({ aspect: 1 / 1 });
    const [image, setimage] = useState(null);
    const [croppedImg, setcroppedImg] = useState(null);
    const [cropped, setcropped] = useState(false);
    const [blob, setblob] = useState(null);

    useEffect(() => {
        setshow(value)
    }, [value]);

    function getCroppedImg() {
        const canvas = document.createElement('canvas');
        const scaleX = image.naturalWidth / image.width;
        const scaleY = image.naturalHeight / image.height;
        canvas.width = crop.width;
        canvas.height = crop.height;
        const ctx = canvas.getContext('2d');

        ctx.drawImage(
            image,
            crop.x * scaleX,
            crop.y * scaleY,
            crop.width * scaleX,
            crop.height * scaleY,
            0,
            0,
            crop.width,
            crop.height,
        );

        if (canvas.width !== 0 || canvas.height !== 0) {
            // As dataURL
            let src = canvas.toDataURL('image/jpeg');
            canvas.toBlob(blob => {
                setblob(blob)
            }, "image/jpeg");
            setcroppedImg(src);
            setcropped(true);
        } else { window.alert('Please crop the image correctly ... 😇 ') }
    }

    const uploadProfilePicture = async () => {
        if (cropped) {
            const url = '/students'
            const data = new FormData();
            data.append('imageUrl', blob)
            await axios.patch(url, data, {
                headers: {
                    "auth-token": localStorage.getItem('auth-token')
                }
            })
                .then((res) => {
                    callback(false);
                    setshow(false);
                    setEdit(false)
                    setcropimg(croppedImg);
                    setcroppedImg(null)
                    history.push('/dashboard/profile');
                })
                .catch((err) => console.log(err))
        } else { window.alert('Please crop the image correctly ... 😇 ') }
    }

    const cancelUpload = () => {
        setshow(false);
        callback(false);
        setcroppedImg(null)
        document.getElementById('imageInput').value = ''
    }

    return (
        <div>
            <Modal show={show}>
                <div style={{ padding: '20px', marginTop: '10px' }}>
                    <h6>Do you want to make this as your profile picture?</h6><br />
                    {
                        croppedImg ?
                            <>
                                <center>
                                    <Image src={croppedImg} fluid alt="Result" style={{ width: '100%' }} />
                                    <br />
                                    <Button variant='primary' style={{ width: '200px', marginTop: '20px' }} onClick={() => setcroppedImg(null)}>Recrop</Button>
                                </center>
                            </>
                            :
                            <center>
                                <ReactCrop src={src} onImageLoaded={setimage} crop={crop} onChange={newCrop => setCrop(newCrop)} />
                                <br />
                                <Button variant='outline-primary' style={{ width: '200px', marginTop: '20px' }} onClick={getCroppedImg}>Crop</Button>
                            </center>
                    }
                    <Row style={{ marginTop: '50px' }}>
                        <Col>
                            <Button variant="-primary" style={{ width: '100%' }} onClick={cancelUpload}>No</Button>
                        </Col>
                        <Col>
                            <Button variant='primary' style={{ width: '100%' }} onClick={uploadProfilePicture}>Yes</Button>
                        </Col>
                    </Row>
                </div>
            </Modal>
        </div>
    );
};

export default ProfileModal;