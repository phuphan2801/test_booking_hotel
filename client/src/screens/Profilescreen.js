import React, { useEffect, useState } from 'react'
import { Tabs } from 'antd';
import { Divider, Space, Tag } from 'antd';
import Loader from '../components/Loader';
import Error from '../components/Error';
import Swal from 'sweetalert2'
import axios from "axios";
const { TabPane } = Tabs;


function Profilescreen() {

    const user = JSON.parse(localStorage.getItem("currentUser"))

    useEffect(() => {
        if (!user) {
            window.location.href = '/login'
        }
    }, [])

    return (
        <div className='ml-3 mt-3'>
            <Tabs defaultActiveKey="1">

                <TabPane className='bs col-md-5' tab="Thông tin cá nhân" key="1">
                    <h1>Thông tin cá nhân</h1>
                    <br />
                    <h1>Họ và tên : {user.name}</h1>
                    <h1>Email : {user.email}</h1>
                    <h1>Admin : {user.isAdmin ? 'YES' : 'NO'}</h1>
                </TabPane>

                <TabPane tab="Thông tin đặt phòng" key="2">
                    <MyBookings />
                </TabPane>
            </Tabs>
        </div>
    )
}

export default Profilescreen

export function MyBookings() {
    const user = JSON.parse(localStorage.getItem("currentUser"))
    const [bookings, setbookings] = useState([])
    const [loading, setloading] = useState(false);
    const [error, seterror] = useState();
    useEffect(() => {
        const fetchData = async () => {
            try {
                setloading(true);
                const data = await (await axios.post('/api/bookings/getbookingsbyuserid', { userid: user._id })).data;
                console.log(data)
                setbookings(data)
                setloading(false)
            } catch (error) {
                console.log(error)
                setloading(false)
                seterror(error)
            }
        }
        fetchData();
    }, [])

    async function cancelBooking(bookingid, roomid) {
        try {
            setloading(true)
            const result = await (await axios.post("/api/bookings/cancelbooking", { bookingid, roomid })).data
            console.log(result)
            setloading(false)
            Swal.fire('Thành Công', 'Đặt phòng của bạn đã bị hủy bỏ', 'success').then(result => {
                window.location.reload()
            })
        } catch (error) {
            console.log(error)
            setloading(false)
            Swal.fire('Thất Bại', 'Không thể hủy đặt phòng của bạn', 'error')
        }
    }

    return (
        <div>
            <div className='row'>
                <div className='col-md-6'>

                    {loading && (<Loader />)}
                    {bookings && (bookings.map(booking => {
                        return <div className='bs'>
                            <h1>{booking.room}</h1>
                            <p><b>Id đặt phòng</b>: {booking._id}</p>
                            <p><b>Ngày đến</b> : {booking.fromdate}</p>
                            <p><b>Ngày đi</b> : {booking.todate}</p>
                            <p><b>Tổng tiền trả</b> : {booking.totalamount}</p>
                            <p><b>Trạng thái</b> :{""} {booking.status == 'cancelled' ? (<Tag color="red">Hủy bỏ</Tag>) : (<Tag color="green">Đã xác nhận</Tag>)}</p>

                            {booking.status !== 'cancelled' && (
                                <div className='text-right'>
                                    <button class='btn btn-primary' onClick={() => { cancelBooking(booking._id, booking.roomid) }}>Hủy đặt phòng</button>
                                </div>
                            )}
                        </div>
                    }))}
                </div>
            </div>
        </div>
    )
}
