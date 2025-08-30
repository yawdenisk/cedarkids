import axios from 'axios';
import React, {useState} from 'react'
import config from '../config'
import { useTranslation } from 'react-i18next'

export default function DeliveryDetailsForm({setShowUserDetailsForm}) {
    const { t } = useTranslation();
    const [firstName, setFirstName] = useState(null);
    const [lastName, setLastName] = useState(null);

    const [error, setError] = useState(null);

    async function sendForm(e) {
        e.preventDefault();
        setError(null);
        try {
            await axios.put(`${config.API_URL}/api/user/update`, {
                firstName,
                lastName
            }, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem("access_tocken")}`
                }
            })
            window.location.reload();
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
        <>{error && (
    <div className="error">
        <p>{error}</p>
        <button onClick={() => setError(null)}>✖</button>
    </div>
)}
        <div className='popUpForm'>
            <form onSubmit={sendForm}>
                <p>{t('userDetailsForm.editAccount')}</p>
                <span className="close" onClick={() => setShowUserDetailsForm(false)}>&#10006;</span>
                <input name='firstName' onChange={(e) => setFirstName(e.target.value)} placeholder={t('userDetailsForm.firstName')}></input>
                <input name='lastName' onChange={(e) => setLastName(e.target.value)} placeholder={t('userDetailsForm.lastName')}></input>
                <button type='submit'>{t('userDetailsForm.submit')}</button>
            </form>
        </div>
        </>
    )
}
