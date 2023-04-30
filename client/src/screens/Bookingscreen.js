import React, { useState, useEffect } from 'react';
import axios from "axios";
import { useParams } from "react-router-dom";
import { Button, Modal, Carousel } from 'react-bootstrap'
import Loader from '../components/Loader';
import Error from '../components/Error';
import moment from 'moment';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import Swal from 'sweetalert2'
function Bookingscreen() {
  
  const [loading, setloading] = useState(true);
  const [error, seterror] = useState();
  const [room, setroom] = useState();
  const { roomid, fromdate, todate } = useParams();

  const firstdate = moment(fromdate, 'DD-MM-YYYY')
  const lastdate = moment(todate, 'DD-MM-YYYY')


  const totaldays = moment.duration(lastdate.diff(firstdate)).asDays() + 1
  const totalamount = room ? totaldays * room.rentperday : 0;
  

  const [show, setShow] = useState(false)
  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  useEffect(() => {
    if (!localStorage.getItem('currentUser')) {
      window.location.reload = '/login'
    }

    const fetchData = async () => {
      try {
        setloading(true);
        const data = (await axios.post("/api/rooms/getroombyid", { roomid: roomid })).data;
        setroom(data);
        setloading(false);
      } catch (error) {
        seterror(true);
        setloading(false);
      }
    };
    fetchData();
  }, []);
  async function shower() {
    const bookingDetails = {
      room,
      userid: JSON.parse(localStorage.getItem('currentUser'))._id,
      fromdate,
      todate,
      totalamount,
      totaldays
    }
    try {
      setloading(true)
      const result = (await axios.post('/api/bookings/bookroom', bookingDetails)).data
      console.log(result)
      setloading(false)

    } catch (error) {
      console.log(error)
      setloading(false)
    }
  }
  async function bookRoom() {
    const bookingDetails = {
      room,
      userid: JSON.parse(localStorage.getItem('currentUser'))._id,
      fromdate,
      todate,
      totalamount,
      totaldays
    }
    try {
      setloading(true)
      const result = (await axios.post('/api/bookings/bookroom', bookingDetails)).data
      console.log(result)
      setloading(false)
      Swal.fire('Thành Công', 'Phòng của bạn đã được đặt', 'success').then(result => {
        window.location.href = '/home'
      })

    } catch (error) {
      console.log(error)
      setloading(false)
      Swal.fire('Thất bại', 'Xảy ra lỗi,thử lại sau...', 'error')
    }
  }


  return (
    <div className='m-5'>

      {loading ? (
        <Loader />
      ) : room ? (

        <div>

          <div className="row justify-content-center mt-5 bs">

            <div className="col-md-6">
              <h1>{room.name}</h1>
              <img src={room.imageurls[0]} className='biging' />
            </div>

            <div className="col-md-6">
              <div style={{ textAlign: 'right' }}>
                <h1>Chi tiết đặt phòng</h1>
                <hr />

                <b>
                  <p>Tên : {JSON.parse(localStorage.getItem('currentUser')).name} </p>
                  <p>Từ ngày : {fromdate} </p>
                  <p>Đến ngày : {todate} </p>
                  <p>Số lượng tối đa : {room.maxcount}</p>
                </b>
              </div>

              <div style={{ textAlign: 'right' }}>
                <b>
                  <h1>Số lượng</h1>
                  <hr />
                  {totaldays && <p>Tổng ngày ở : {totaldays} </p>}
                  <p>Tiền thuê mỗi ngày :{room.rentperday} </p>
                  <p>Tổng tiền trả : {totalamount} </p>
                </b>
              </div>

              <div style={{ float: 'right' }}>
                <button className='btn btn-primary' onClick={bookRoom}>Thanh toán sau</button>
                <button className='btn btn-primary' onClick={handleShow}>Thanh toán online</button>
              </div>

            </div>

          </div>

        </div>) : (<Error />)}
      
        <Modal show={show} onHide={handleClose} size='lg'>
          <Modal.Body>
            <div class="center">
              <h2><b>Thanh toán online</b></h2>
            </div>
            {/* EKF1O2Ryq5UUljZGYj28uEXixFerxV8FKKTf_pNpoNQBxAQJTFruy8rkKUiwNVsIvSPbjKRLpvlaVQK_ */}
            <PayPalScriptProvider options={{"client-id":"AVRqdvN4ooimG8W52PG9uq2d_p-_9f4Y9vf-9MXx8UP_6oQtDYlCAzEpd7cr1135kPTGtwQrIIWnDCdI"}}>
              <PayPalButtons onClick={shower}
                 createOrder={(data,actions)=>{
                   return actions.order.create({
                    purchase_units:[
                      {
                        amount:{
                          value: (Math.round(totalamount/23.133)).toString(),
                          currency_code: "USD"
                        },
                      },
                    ],
                   });
                 }}
                 onApprove={(data, actions) => {
                  return actions.order.capture().then(function(details){
                    alert(
                        'Giao dịch hoàn thành bởi' + details.payer.name.given_name
                    );
                  });
                 }}
              />
            </PayPalScriptProvider>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Đóng
            </Button>
          </Modal.Footer>
        </Modal>
      
    </div>
  );
}

export default Bookingscreen;
