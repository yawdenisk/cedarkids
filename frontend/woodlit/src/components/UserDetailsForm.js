import axios from 'axios';
import React, {useState} from 'react'

export default function DeliveryDetailsForm({setShowUserDetailsForm}) {
    const [firstName, setFirstName] = useState(null);
    const [lastName, setLastName] = useState(null);

    const [error, setError] = useState(null);

    async function sendForm(e) {
        e.preventDefault();
        setError(null);
        try {
            await axios.put('https://cedarkids.work.gd/api/user/update/', {
                firstName,
                lastName
            }, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem("access_tocken")}`
                }
            })
            window.location.reload();
        } catch (error) {
            setError(error.response.data);
        }
    }

    return (
        <div className='popUpForm'>
            <form onSubmit={sendForm}>
                <p>Edit account</p>
                {error &&
                    <p className="error">{error}</p>
                }
                <span className="close" onClick={() => setShowUserDetailsForm(false)}>&#10006;</span>
                <input name='firstName' onChange={(e) => setFirstName(e.target.value)} placeholder='First name'></input>
                <input name='lastName' onChange={(e) => setLastName(e.target.value)} placeholder='Last name'></input>
                <button type='submit'>Submit</button>
            </form>
        </div>
    )
}
