import React, { useEffect, useState } from 'react'
import { Tabs } from 'antd';
import Loader from '../components/Loader';
import Error from '../components/Error';
import axios from 'axios';
import Swal from 'sweetalert2'
const { TabPane } = Tabs;
function Adminscreen() {

    useEffect(() => {
        if (!JSON.parse(localStorage.getItem("currentUser")).isAdmin) {
            window.location.href = '/home'
        }
    }, [])
    return (
        <div className='mt-3 ml-3 mr-3 bs'>
            <h2 className='text-center' style={{ fontSize: '30px' }}><b>QUẢN LÝ ĐẶT PHÒNG</b></h2>
            <Tabs defaultActiveKey="1">
                <TabPane tab="Đặt phòng" key="1">
                    <Bookings />
                </TabPane>
                <TabPane tab="Phòng" key="2">
                    <Rooms />
                </TabPane>
                <TabPane tab="Thêm phòng" key="3">
                    <Addroom />
                </TabPane>
                <TabPane tab="Người dùng" key="4">
                    <Users />
                </TabPane>
            </Tabs>
        </div>
    )
}

export default Adminscreen

export function Bookings() {
    const [bookings, setbookings] = useState([])
    const [loading, setloading] = useState(true)
    const [error, seterror] = useState()
    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await (await axios.get("/api/bookings/getallbookings")).data
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
    return (
        <div className='row'>
            <div className='col-md-12'>
              
                {loading && <Loader />}
                <table className='table table-bordered table-dark'>
                    <thead className='bs'>
                        <tr>
                            <th>ID đặt phòng</th>
                            <th>ID người dùng</th>
                            <th>Phòng</th>
                            <th>Ngày đến</th>
                            <th>Ngày đi</th>
                            <th>Trạng thái</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bookings.length && (bookings.map(booking => {
                            return <tr>
                                <th>{booking._id}</th>
                                <th>{booking.userid}</th>
                                <th>{booking.room}</th>
                                <th>{booking.fromdate}</th>
                                <th>{booking.todate}</th>
                                <th>{booking.status == 'cancelled' ? <p>Hủy bỏ</p>: <p>Đã đặt</p>}</th>
                            </tr>
                        }))}
                    </tbody>
                </table>

            </div>
        </div>
    )
}
export function Rooms() {
    const [rooms, setrooms] = useState([])
    const [loading, setloading] = useState(true)
    const [error, seterror] = useState()
    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await (await axios.get("/api/rooms/getallrooms")).data
                setrooms(data)
                setloading(false)
            } catch (error) {
                console.log(error)
                setloading(false)
                seterror(error)
            }
        }
        fetchData();
    }, [])
    return (
        <div className='row'>
            <div className='col-md-12'>
             
                {loading && <Loader />}
                <table className='table table-bordered table-dark'>
                    <thead className='bs'>
                        <tr>
                            <th>ID phòng</th>
                            <th>Tên phòng</th>
                            <th>Loại</th>
                            <th>Tiền thuê mỗi ngày</th>
                            <th>Số lượng tối đa</th>
                            <th>Số điện thoại</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rooms.length && (rooms.map(room => {
                            return <tr>
                                <th>{room._id}</th>
                                <th>{room.name}</th>
                                <th>{room.type}</th>
                                <th>{room.rentperday}</th>
                                <th>{room.maxcount}</th>
                                <th>{room.phonenumber}</th>
                            </tr>
                        }))}
                    </tbody>
                </table>

            </div>
        </div>
    )
}
export function Users() {
    const [users, setusers] = useState([])
    const [loading, setloading] = useState(true)
    const [error, seterror] = useState()
    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await (await axios.get("/api/users/getallusers")).data
                setusers(data)
                setloading(false)
            } catch (error) {
                console.log(error)
                setloading(false)
                seterror(error)
            }
        }
        fetchData();
    }, [])
    return (
        <div className='row'>
            <div className='col-md-12'>
                {loading && <Loader />}
                <table className='table table-bordered table-dark'>
                    <thead>
                        <tr>
                            <th>ID người dùng</th>
                            <th>Tên người dùng</th>
                            <th>Email</th>
                            <th>Admin</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users && (users.map(user => {
                            return <tr>
                                <th>{user._id}</th>
                                <th>{user.name}</th>
                                <th>{user.email}</th>
                                <th>{user.isAdmin ? 'YES' : 'NO'}</th>
                            </tr>
                        }))}
                    </tbody>
                </table>

            </div>
        </div>
    )
}

export function Addroom() {
    const [loading, setloading] = useState(false)
    const [error, seterror] = useState()
    const [name, setname] = useState('')
    const [rentperday, setrentperday] = useState()
    const [maxcount, setmaxcount] = useState()
    const [description, setdescription] = useState()
    const [phonenumber, setphonenumber] = useState()
    const [type, settype] = useState()
    const [imageurl1, setimageurl1] = useState()
    const [imageurl2, setimageurl2] = useState()
    const [imageurl3, setimageurl3] = useState()

    async function addRoom() {
        const newroom = {
            name,
            rentperday,
            maxcount,
            description,
            phonenumber, 
            type,
            imageurls: [imageurl1, imageurl2, imageurl3]
        }
        try {
            setloading(true)
            const result = await (await axios.post('/api/rooms/addroom', newroom)).data
            console.log(result)
            setloading(false)
            Swal.fire('Thành Công', 'Phòng của bạn đã được thêm', 'success').then(result => {
                window.location.href = '/home'
            })
        } catch (error) {
            console.log(error)
            setloading(false)
            Swal.fire('Thất bại', 'Xảy ra lỗi,thử lại sau...', 'error')
        }
    }

    return (
        <div className='row'>
            <div className='col-md-5'>
                {loading && <Loader />}
                <input type="text" className='form-control' placeholder='Tên phòng'
                    value={name} onChange={(e) => { setname(e.target.value) }}
                />
                <input type="text" className='form-control' placeholder='Tiền thuê mỗi ngày'
                    value={rentperday} onChange={(e) => { setrentperday(e.target.value) }}
                />
                <input type="text" className='form-control' placeholder='Số lượng tối đa'
                    value={maxcount} onChange={(e) => { setmaxcount(e.target.value) }}
                />
                <input type="text" className='form-control' placeholder='Mô tả'
                    value={description} onChange={(e) => { setdescription(e.target.value) }}
                />
                <input type="text" className='form-control' placeholder='Số điện thoại'
                    value={phonenumber} onChange={(e) => { setphonenumber(e.target.value) }}
                />
            </div>
            <div className='col-md-5'>
                <input type="text" className='form-control' placeholder='Loại phòng'
                    value={type} onChange={(e) => { settype(e.target.value) }}
                />
                <input type="text" className='form-control' placeholder='Link ảnh 1'
                    value={imageurl1} onChange={(e) => { setimageurl1(e.target.value) }}
                />
                <input type="text" className='form-control' placeholder='Link ảnh 2'
                    value={imageurl2} onChange={(e) => { setimageurl2(e.target.value) }}
                />
                <input type="text" className='form-control' placeholder='Link ảnh 3'
                    value={imageurl3} onChange={(e) => { setimageurl3(e.target.value) }}
                />

                <div className='text-right'>
                    <button className='btn btn-primary mt-2' onClick={addRoom}>Thêm phòng</button>

                </div>
            </div>
        </div>
    )
}