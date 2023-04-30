import React, { useState } from 'react'
import { Button, Modal, Carousel } from 'react-bootstrap'
import { Link } from 'react-router-dom'
function Room({ room, fromdate, todate }) {

    const [show, setShow] = useState(false)
    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)
    return (
        <div className="row bs">
            <div className="col-md-4">
                <img src={room.imageurls[0]} className='smalling' />
            </div>
            <div className="col-md-7">
                <h1>{room.name}</h1>
                <b>
                    <p>Số lượng tối đa : {room.maxcount}</p>
                    <p>Số điện thoại : {room.phonenumber}</p>
                    <p>Loại phòng : {room.type}</p>
                </b>

                <div style={{ float: 'right' }}>

                    {(fromdate && todate) && (
                        <Link to={`/book/${room._id}/${fromdate}/${todate}`}>
                            <button className='btn btn-primary m-2'>Đặt ngay</button>
                        </Link>

                    )}

                    <button className='btn btn-primary' onClick={handleShow}>Xem chi tiết</button>
                </div>
            </div>



            <Modal show={show} onHide={handleClose} size='lg'>
                <Modal.Header>
                    <Modal.Title>{room.name}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Carousel>
                        {room.imageurls.map(url => {
                            return <Carousel.Item>
                                <img
                                    className="d-block w-100 biging"
                                    src={url}
                                />
                            </Carousel.Item>
                        })}
                    </Carousel>
                    <p>{room.description}</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Đóng
                    </Button>
                </Modal.Footer>
            </Modal>

        </div>
    )
}

export default Room
