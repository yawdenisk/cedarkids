import axios from 'axios'
import React, {useEffect, useState} from 'react'
import google from '../images/google.png'
import {Link, useNavigate} from 'react-router-dom';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    async function handleSubmit(event) {
        event.preventDefault();
        try {
            const responce = await axios.post("http://localhost:8081/user/login", {
                email,
                password,
            })
            navigate("/user")
            localStorage.setItem("access_tocken", responce.data)
        } catch (error) {
            console.error(error);
        }
    };
    return (
        <>
            <form className='formLogin' onSubmit={handleSubmit}>
                <p>Sing in</p>
                <input type='text' name='email' placeholder='email' onChange={(e) => setEmail(e.target.value)}></input>
                <input type='text' name='password' placeholder='password'
                       onChange={(e) => setPassword(e.target.value)}></input>
                <button type='submit'>Submit</button>
                <p>Don't have an account? <Link to="/register">Sign up</Link></p>
            </form>
        </>
    )
}
