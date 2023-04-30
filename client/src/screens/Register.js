import React, { useState, useEffect } from 'react'
import Loader from '../components/Loader';
import Error from '../components/Error';
import { Link } from 'react-router-dom'
import Success from '../components/Success';
import zxcvbn from 'zxcvbn';
import styled from 'styled-components';
import axios from "axios";

function Register() {
    const [name, setname] = useState('')
    const [email, setemail] = useState('')
    const [password, setpassword] = useState('')
    const [score, setscore] = useState(0);
    const [cpassword, setcpassword] = useState('')

    const [loading, setloading] = useState(false);
    const [error, seterror] = useState();
    const [success, setsuccess] = useState();

    function isEmailValid(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    async function register() {
        if (!isEmailValid(email)) {
            alert('Địa chỉ email không hợp lệ');
            return;
        }
        if (password === cpassword) {
            const user = {
                name,
                email,
                password,
                cpassword
            }

            try {
                setloading(true);
                const result = (await axios.post('/api/users/register', user)).data
                console.log(result)
                setloading(false);
                setsuccess(true);

                setname('')
                setemail('')
                setcpassword('')
            } catch (error) {
                console.log(error)
                setloading(false);
                seterror(true);
            }

        } else {
            alert('Mật khẩu không khớp')
        }
    }
    const handlePasswordChange = (event) => {
        setpassword(event.target.value);

        setscore(zxcvbn(event.target.value).score);
    };

    return (

        <div>

            {loading && (<Loader />)}
            {error && (<Error />)}

            <div className="row justify-content-center mt-5">
                <div className="col-md-5 mt-5">
                    {success && (<Success message='Đăng kí thành công' />)}
                    <div className='bs'>
                        <h2>Đăng ký</h2>
                        <input type="text" className="form-control" placeholder="Họ và Tên" value={name} onChange={(e) => { setname(e.target.value) }} />
                        <input type="text" className="form-control" placeholder="Email" value={email} onChange={(e) => { setemail(e.target.value) }} />

                        <Wrapper>
                            <input
                                type="password" className="form-control" placeholder="Mật Khẩu" value={password}
                                onChange={handlePasswordChange}
                            />
                        </Wrapper>
                        <input type="password" className="form-control" placeholder="Xác Nhận Mật Khẩu" value={cpassword} onChange={(e) => { setcpassword(e.target.value) }} />
                        <Strength score={score} />
                        <button className='btn btn-primary mt-3' onClick={register}>Đăng ký</button>
                        <div className='py-2 text-gray-500'>
                            Đã là thành viên hay chưa? <Link style={{ color: 'black' }} to={'/login'}>Đăng nhập ngay</Link>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Register

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
`;



const Strength = styled.div`
  height: 0.5rem;
  background-color: ${({ score }) =>
        score === 0
            ? '#ccc'
            : score === 1
                ? '#dc3545'
                : score === 2
                    ? '#ffc107'
                    : score === 3
                        ? '#28a745'
                        : '#6610f2'};
  margin-top: 0.5rem;
`;
