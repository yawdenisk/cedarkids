import axios from 'axios';
import React, {useEffect, useState} from 'react'
import config from '../config'
import { useTranslation } from 'react-i18next'
export default function DeliveryDetailsForm({setShowDeliveryDetailsForm}) {
    const { t } = useTranslation();
    const [address, setAdress] = useState(null);
    const [city, setCity] = useState(null);
    const [country, setCountry] = useState(null);
    const [phone, setPhone] = useState(null);
    const [postalCode, setPostalCode] = useState(null);

    const [error, setError] = useState(null);

    useEffect(() => {
        if (error) {
            const timer = setTimeout(() => setError(false), 4900);
            return () => clearTimeout(timer);
        }
    }, [error]);

    async function sendForm(e) {
        e.preventDefault();
        setError(null);
        try {
            await axios.post(`${config.API_URL}/api/deliveryDetails/create`, {
                city,
                country,
                address,
                phone,
                postalCode
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
        <>
        {error && (
    <div className="error">
        <p>{error}</p>
        <button onClick={() => setError(null)}>✖</button>
    </div>
)}
            <div className='popUpForm'>
            <form onSubmit={sendForm}>
                <p>{t('deliveryForm.newAddress')}</p>
                <span className="close" onClick={() => setShowDeliveryDetailsForm(false)}>&#10006;</span>
                <input name='country' onChange={(e) => setCountry(e.target.value)} placeholder={t('cart.country')}></input>
                <input name='city' onChange={(e) => setCity(e.target.value)} placeholder={t('cart.city')}></input>
                <input name='address' onChange={(e) => setAdress(e.target.value)} placeholder={t('cart.address')}></input>
                <input name='phone' onChange={(e) => setPhone(e.target.value)} placeholder={t('cart.phone')}></input>
                <input name='postalCode' onChange={(e) => setPostalCode(e.target.value)}
                       placeholder={t('deliveryForm.postal')}></input>
                <button type='submit'>{t('deliveryForm.submit')}</button>
            </form>
        </div>
        </>
        
    )
}
