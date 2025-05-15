import axios from 'axios'
import React, {useState} from 'react'
import {Link, useNavigate} from 'react-router-dom'

export default function Registration() {
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [errors, setErrors] = useState({});

    const navigate = useNavigate();

    const getFieldStyle = (field) => {
        return errors[field] ? {borderColor: 'red'} : {};
    };

    async function handleSubmit(event) {
        event.preventDefault();
        const validationErrors = validateForm();

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }
        try {
            await axios.post('https://cedarkid.work.gd/api/user/create', {
                password,
                email,
                firstName,
                lastName
            })
            navigate('/login')
        } catch (error) {
            if (error.response) {
                const responseData = error.response.data;
                if (responseData && responseData.includes("email")) {
                    setErrors({email: error.response.data});
                } else if (responseData && responseData.includes("username")) {
                    setErrors({username: error.response.data});
                } else {
                    setErrors({server: "An unknown error occurred"});
                }
            }
        }
    }

    const validateForm = () => {
        const validationErrors = {};

        if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            validationErrors.email = 'Enter a valid email';
        }

        if (password.length < 8 || password.length > 16) {
            validationErrors.password = 'Password must be between 8 and 16 characters';
        }

        if (!firstName.trim()) {
            validationErrors.firstName = 'Name is required';
        }

        if (!lastName.trim()) {
            validationErrors.lastName = 'Last name is required';
        }
        return validationErrors;
    };

    return (
        <div className='formLogin'>
            <p>Sing up</p>
            {Object.keys(errors).length > 0 && (
                <div className="error">
                    <p>{Object.values(errors)[0]}</p>
                </div>
            )}
            <form className='' onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="email"
                    placeholder="Email"
                    onChange={(e) => setEmail(e.target.value)}
                    style={getFieldStyle('email')}
                />
                <input
                    type="text"
                    name="password"
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                    style={getFieldStyle('password')}
                />
                <input
                    type="text"
                    name="firstName"
                    placeholder="First Name"
                    onChange={(e) => setFirstName(e.target.value)}
                    style={getFieldStyle('firstName')}
                />
                <input
                    type="text"
                    name="lastName"
                    placeholder="Last Name"
                    onChange={(e) => setLastName(e.target.value)}
                    style={getFieldStyle('lastName')}
                />
                <button type="submit">Submit</button>
                <p>Already have an account? <Link to="/login">Sign in</Link></p>
            </form>
        </div>
    );
}
