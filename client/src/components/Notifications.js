import React, { useEffect, useState } from 'react';
import { Row, Col, Spinner, Modal } from 'react-bootstrap';
import { TiWarningOutline } from 'react-icons/ti';
import { VscInfo } from 'react-icons/vsc';
import { IoMdCheckmarkCircleOutline } from 'react-icons/io'
import { HiOutlineClipboardList } from 'react-icons/hi';
import { Helmet } from 'react-helmet'

const Notifications = (props) => {

  const [show, setShow] = useState(false);
  const [data, setData] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('auth-token');
    if (!token) {
      props.history.push('/login')
    }
  }, [props.history]);

  const onClickNotification = (x) => {
    setData(x);
    setShow(true);
  }

  const getDate = (x) => {

    const date = new Date(x);

    //Pad given value to the left with "0"
    function AddZero(num) {
      return (num >= 0 && num < 10) ? "0" + num : num + "";
    }
    
    var strDateTime = [[AddZero(date.getDate()),
    AddZero(date.getMonth() + 1),
    date.getFullYear()].join("/"),
    [AddZero(date.getHours()),
    AddZero(date.getMinutes())].join(":"),
    date.getHours() >= 12 ? "PM" : "AM"].join(" ");
    
    return strDateTime
  }

  return (
    <>
      <Helmet>
        <title>Notifications | TPC</title>
      </Helmet>
      <div className="Notifications">
        <Row className="justify-content-md-center">
          <Col xs lg="8">
            {props.notifications ? props.notifications === 'error' ?
              <p style={{ textAlign: 'center' }}>Error loading data</p>
              :
              props.notifications.length === 0 ? <p style={{ textAlign: 'center' }}>No current notifications</p> :
                props.notifications.map((notifier, index) => (
                  <div key={index} style={{ margin: '30px 0' }}>
                    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                      <p style={{ margin: '0px', fontSize: '10px', color: '#6b818b', fontWeight: 'bold' }}>{getDate(notifier.createdAt)}</p>
                    </div>
                    <Row className="notifier">
                      <Col md={1} xs={2} className="notifier-typo">
                        {
                          notifier.type === 'warning' ?
                            <TiWarningOutline size={24} /> :
                            notifier.type === 'info' ?
                              <VscInfo size={24} /> :
                              notifier.type === 'success' ?
                                <IoMdCheckmarkCircleOutline size={24} />
                                : notifier.type === 'test' ?
                                  <HiOutlineClipboardList size={24} /> : null

                        }

                      </Col>
                      <Col xs={10} md={11} className="notifier-body align-self-center" onClick={() => onClickNotification(notifier)}>
                        <p className="title">{notifier.title.toUpperCase()}</p>
                        <p className="description">{notifier.description}</p>
                      </Col>
                    </Row>
                  </div>
                )) :
              <div style={{ minHeight: '20vh', textAlign: 'center' }}>
                <center style={{ marginTop: '80px' }}>
                  <Spinner size='xl' animation='grow' /><br /><br />
                  Retrieving data...
                </center>
              </div>
            }
          </Col>
        </Row>
        <Modal show={show} onHide={() => setShow(false)}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >

          <Modal.Body>
            <p style={{ fontWeight: 'bold' }}>{data ? data.title.toUpperCase() : 'loading...'}</p>
            <hr />
            {data ? data.description : 'loading...'}
          </Modal.Body>
        </Modal>
      </div >
    </>
  )
}

export default Notifications