import axios from 'axios'
import React, {useEffect, useState} from 'react'
import google from '../images/google.png'
import {Link, useNavigate} from 'react-router-dom';
import config from '../config'

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    async function handleSubmit(event) {
        event.preventDefault();
        try {
            const responce = await axios.post(`${config.API_URL}/api/user/login`, {
                email,
                password,
            })
            navigate("/user")
            localStorage.setItem("access_tocken", responce.data)
        } catch (err) {
        console.error("Something went wrong. Please try again.", err);
        if (err.response && err.response.data && err.response.data.message) {
            setError(err.response.data.message);
        } else {
            setError("Something went wrong. Please try again.");
        }
         setTimeout(() => {
        setError(null);
    }, 5000);
    }
    };
    return (
        <>
        {error && (
    <div className="error">
        <p>{error}</p>
        <button onClick={() => setError(null)}>✖</button>
    </div>
)}
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
