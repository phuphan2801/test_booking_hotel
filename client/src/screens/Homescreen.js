import React, { useState, useEffect } from 'react'
import axios from "axios";
import Room from '../components/Room';
import Loader from '../components/Loader';
import Error from '../components/Error';
import 'antd/dist/reset.css';
import moment from "moment";
import { DatePicker, Space } from 'antd';
const { RangePicker } = DatePicker;




function Homescreen() {
  const [rooms, setRooms] = useState([]);
  const [loading, setloading] = useState();
  const [error, seterror] = useState();
  const [fromdate, setfromdate] = useState();
  const [todate, settodate] = useState();
  const [duplicaterooms, setduplicaterooms] = useState([]);

  const [searchkey, setsearchkey] = useState('');
  const [type, settype] = useState('all');
  useEffect(() => {
    const fetchData = async () => {
      try {
        setloading(true);
        const data = (await axios.get('/api/rooms/getallrooms')).data
        setRooms(data);
        setduplicaterooms(data);
        setloading(false);
      } catch (error) {
        seterror(true);
        console.log(error);
        setloading(false);
      }
    };

    fetchData();
  }, []);
  function filterByDate(dates) {
    setfromdate((dates[0]).format('DD-MM-YYYY'))
    settodate((dates[1]).format('DD-MM-YYYY'))


    var temprooms = []

    for (const room of duplicaterooms) {
      var availability = false
      if (room.currentbookings.length > 0) {
        for (const booking of room.currentbookings) {
          if (!moment(moment(dates[0]).format('DD-MM-YYYY')).isBetween(booking.fromdate, booking.todate)
            && !moment(moment(dates[1]).format('DD-MM-YYYY')).isBetween(booking.fromdate, booking.todate)
          ) {
            if (
              dates[0].format('DD-MM-YYYY') !== booking.fromdate &&
              dates[0].format('DD-MM-YYYY') !== booking.todate &&
              dates[1].format('DD-MM-YYYY') !== booking.fromdate &&
              dates[1].format('DD-MM-YYYY') !== booking.todate
            ) {
              availability = true
            }
          }
        }
      } else {
        availability = true
      }
      if (availability === true) {
        temprooms.push(room)
      }
      setRooms(temprooms)
    }
  }
  function filterBySearch() {
    const temprooms = duplicaterooms.filter(room => room.name.toLowerCase().includes(searchkey.toLowerCase()))
    setRooms(temprooms)
  }
  function filterByType(e) {
    settype(e)
    if (e !== 'all') {
      const temprooms = duplicaterooms.filter(room => room.type.toLowerCase() == e.toLowerCase())
      setRooms(temprooms)
    }else{
      setRooms(duplicaterooms)
    }
  }


  return (
    <div className='container'>
      <div className='row mt-5 bs'>
        <div className="col-md-3">
          <RangePicker format='DD-MM-YYYY' onChange={filterByDate} />
        </div>

        <div className='col-md-5'>
          <input type="text" className='form-control' placeholder='Tìm phòng'
            value={searchkey} onChange={(e) => { setsearchkey(e.target.value) }} onKeyUp={filterBySearch}
          />
        </div>
        <div className='col-md-3'>
          <select className='form-control' value={type} onChange={(e) => {filterByType(e.target.value)}}>
            <option value="all">Tất cả</option>
            <option value="SUP">SUP</option>
            <option value="DLX">DLX</option>
            <option value="PR">PR</option>
          </select>
        </div>

      </div>

      <div className="row justify-content-center mt-5">
        {loading ? (<Loader />
        ) : (
          rooms.map((room) => {
            return <div className="col-md-9 mt-3">
              <Room room={room} fromdate={fromdate} todate={todate} />
            </div>;
          })
        )}
      </div>
    </div>
  );
}

export default Homescreen;
