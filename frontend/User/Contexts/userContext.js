import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import { useNavigate } from 'react-router-dom'
import Validation from '../LoginValidation';

export const AuthContext = React.createContext(null);

export function useAuth() {
    return useContext(AuthContext);
}

export function UserInfo({ children }) {
    const [values, setValues] = useState({
        email: '',
        password: '',
    });
    const [user, setUser] = useState({});
    const [loggedIn, setLoggedIn] = useState(false);
    const [errors, setErrors] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('authToken');
        if (token) {
            const user = jwt_decode(token);
            setUser(user);
            setLoggedIn(true);
        }
    }, []);

    const handleInput = (event) => {
        setValues(prev => ({ ...prev, [event.target.name]: [event.target.value] }));
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        setErrors(Validation(values));
        navigate('/');
    }

    const value = {
        user,
        setUser,
        loggedIn,
        setLoggedIn,
        errors,
        handleInput,
        handleSubmit
    }

    useEffect(() => {
        if (errors.email === "" && errors.password === "") {
            axios.post('http://localhost:8081/user/login', values)
                .then(res => {
                    let user = jwt_decode(res.data.token);
                    setUser(user);
                    setLoggedIn(true);
                    localStorage.setItem('authToken', res.data.token);

                })
                .catch(err => console.log(err));
        }
    }, [errors, values, setUser, setLoggedIn]);

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}
