import axios from 'axios'
import React, {useState} from 'react'
import {Link, useNavigate} from 'react-router-dom'

export default function Registration() {
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    async function handleSubmit(event) {
        event.preventDefault();
        try {
            await axios.post('https://cedarkids.eu/api/user/create', {
                password,
                email,
                firstName,
                lastName
            })
            navigate('/login')
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
    }
    return (
        <>
        {error && (
    <div className="error">
        <p>{error}</p>
        <button onClick={() => setError(null)}>✖</button>
    </div>
)}
        <div className='formLogin'>
            <p>Sing up</p>
            <form className='' onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="email"
                    placeholder="Email"
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="text"
                    name="password"
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                />
                <input
                    type="text"
                    name="firstName"
                    placeholder="First Name"
                    onChange={(e) => setFirstName(e.target.value)}
                />
                <input
                    type="text"
                    name="lastName"
                    placeholder="Last Name"
                    onChange={(e) => setLastName(e.target.value)}
                />
                <button type="submit">Submit</button>
                <p>Already have an account? <Link to="/login">Sign in</Link></p>
            </form>
        </div>
        </>
    );
}
