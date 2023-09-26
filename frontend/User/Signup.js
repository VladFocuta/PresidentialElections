import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';
import Validation from './LoginValidation';

function Signup() {
    const [values, setValues] = useState({
        name: '',
        email: '',
        password: ''
    })
    const [message, setMessage] = useState('');
    const navigate = useNavigate();
    const [errors, setErrors] = useState([])

    const handleInput = (event) => {
        setValues(prev => ({ ...prev, [event.target.name]: [event.target.value] }))
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        setErrors(Validation(values));
    }
    useEffect(() => {
        if (errors.email === "" && errors.password === "" && errors.name === "") {
            axios.post('http://localhost:8081/user/signup', values)
                .then(res => {
                    if (res.data.Status === "Succes") {
                        navigate('/login');
                    } else {
                        setMessage(res.data.Error);
                    }

                })
                .catch(err => console.log(err));
        }
    }, [errors, navigate, values]);

    return (
        <div>
            <div className='d-flex justify-content-center align-items-center bg-primary vh-100'>
                <div className='bg-white p-3 rounded w-25'>
                    <h2>Sign-up</h2>
                    <form action="" onSubmit={handleSubmit}>
                        <div className='mb-3'>
                            <label htmlFor="name"><strong>Name</strong></label>
                            <input type="text" placeholder='Enter Name' name='name'
                                onChange={handleInput} className='form-control rounded-0' />
                            {errors.name && <span className='text-danger'>{errors.name}</span>}
                        </div>
                        <div className='mb-3'>
                            <label htmlFor="password"><strong>Password</strong></label>
                            <input type="text" placeholder='Enter Password' name='password'
                                onChange={handleInput} className='form-control rounded-0' />
                            {errors.password && <span className='text-danger'>{errors.password}</span>}
                        </div>
                        <div className='mb-3'>
                            <label htmlFor="email"><strong>E-mail</strong></label>
                            <input type="text" placeholder='Enter Email' name='email'
                                onChange={handleInput} className='form-control rounded-0' />
                            {errors.email && <span className='text-danger'>{errors.email}</span>}
                            <span className='text-danger'>{message}</span>
                        </div>
                        <button className='btn btn-primary w-100'>Sign Up</button>
                        <Link to="/login" className='btn btn-default border w-100 bg-light'>Login</Link>
                    </form>
                </div>
            </div>
        </div>
    )
}
export default Signup
