import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Loader from '../components/Loader';
import Error from '../components/Error';
import axios from "axios";
function Loginscreen() {

    const [email, setemail] = useState('')
    const [password, setpassword] = useState('')
    const [loading, setloading] = useState(false);
    const [error, seterror] = useState();

    async function login() {
        const user = {

            email,
            password

        }
        try {
            setloading(true);
            const result = (await axios.post('/api/users/login', user)).data
            console.log(result)
            setloading(false);
            if (result && result.name) {
                localStorage.setItem('currentUser', JSON.stringify(result));
                window.location.href = '/home';
            } else {
                seterror('Thông tin đăng nhập không chính xác');
            }

        } catch (error) {
            console.log(error)
            setloading(false);
            seterror('Đã xảy ra lỗi khi đăng nhập');
        }

    }
    return (

        <div>
            {loading && (<Loader />)}
            <div className="row justify-content-center mt-5">
                <div className="col-md-5 mt-5">
                    {error && <Error message={error} />}
                    <div className='bs'>
                        <h2>Đăng nhập</h2>
                        <input type="text" className="form-control" placeholder="Email" value={email} onChange={(e) => { setemail(e.target.value) }} />
                        <input type="password" className="form-control" placeholder="Mật Khẩu" value={password} onChange={(e) => { setpassword(e.target.value) }} />
                        <button className='btn btn-primary mt-3' onClick={login}>Đăng nhập</button>
                        <div className='py-2 text-gray-500'>
                            Bạn chưa có tài khoản? <Link style={{ color: 'black' }} to={'/register'}>Đăng kí ngay</Link>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Loginscreen
