import axios from 'axios'
import React, {useEffect, useState} from 'react'
import loading from '../images/loading.svg'
import {useNavigate} from 'react-router-dom';
import DeliveryDetailsForm from './DeliveryDetailsForm';
import UserDetailsForm from './UserDetailsForm';
import config from '../config'
import { useTranslation } from 'react-i18next'

export default function UserPanel() {
    const { t } = useTranslation();
    const [userDetails, setUserDetails] = useState({});
    const [item, setItem] = useState('account');
    const [showDeliveryDetailsForm, setShowDeliveryDetailsForm] = useState(false);
    const [showUserDetailsForm, setShowUserDetailsForm] = useState(false);
    const navigate = useNavigate();
    useEffect(() => {
        fetchUserDetails();
    }, []);
    if (!userDetails || !userDetails.deliveryDetails) {
        return (
            <div className='loading'><img src={loading} alt='none gif'></img></div>
        )
    }

    async function fetchUserDetails() {
        try {
            const response = await axios.get(`${config.API_URL}/api/user/getUserDetails`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem("access_tocken")}`
                }
            })
            setUserDetails(response.data);
        } catch (error) {
            if (error.response.status == 401) {
                navigate('/login');
            } else {
                navigate('/error');
            }
        }
    }

    async function logout() {
        try {
            await axios.post(`${config.API_URL}/api/user/logout`, {}, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem("access_tocken")}`
                }
            });
            localStorage.clear('Authorization')
            navigate('/')
        } catch (error) {
            if (error.response.status == 401) {
                navigate('/login');
            } else {
                navigate('/error');
            }
        }
    }

    return (
        <>
            {showDeliveryDetailsForm && (
                <DeliveryDetailsForm setShowDeliveryDetailsForm={setShowDeliveryDetailsForm}/>
            )}
            {showUserDetailsForm && (
                <UserDetailsForm setShowUserDetailsForm={setShowUserDetailsForm}/>
            )}
            <div className='container'>
                <div className='panel'>
                    <div className='menu'>
                        <ul>
                            <li onClick={() => setItem('account')}>{t('userPanel.account')}</li>
                            <li onClick={() => setItem('orders')}>{t('userPanel.orders')}</li>
                            <li onClick={logout}>{t('userPanel.logout')}</li>
                        </ul>
                    </div>
                    <div className='view'>
                        {item == 'account' && (
                            <>
                                <div className='userInfo'>
                                    <p>{t('userPanel.email')}: {userDetails.email}</p>
                                    <p>{t('userPanel.name')}: {userDetails.firstName}</p>
                                    <p>{t('userPanel.lastName')}: {userDetails.lastName}</p>
                                    <button onClick={() => {
                                        setShowUserDetailsForm(true);
                                        setShowDeliveryDetailsForm(false)
                                    }}>{t('userPanel.edit')}
                                    </button>
                                    <span></span>
                                    <p>{t('userPanel.delivery')}</p>
                                    <button onClick={() => {
                                        setShowDeliveryDetailsForm(true);
                                        setShowUserDetailsForm(false)
                                    }}>{t('userPanel.addNewAddress')}
                                    </button>
                                </div>
                                <ul className='deliveryDetails'>
                                    {userDetails.deliveryDetails.map(item => (
                                        <li key={item.id}>
                                            <p>{t('cart.phone')}: {item.phone}</p>
                                            <p>{t('cart.country')}: {item.country}</p>
                                            <p>{t('cart.city')}: {item.city}</p>
                                            <p>{t('cart.address')}: {item.address}</p>
                                            <p>{t('cart.postalCode')}: {item.postalCode}</p>
                                        </li>
                                    ))}
                                </ul>
                            </>
                        )}
                        {item == 'orders' && (
                            <ul className='orders'>
                                {userDetails.orders.map(order => (
                                    <li key={order.id}>
                                            <nav>
                                                <p style={{color: order.status === 'UNPAID' ? 'rgb(248, 0, 0)' : 'rgb(121, 227, 121)'}}>
                                                    {order.status}
                                                </p>
                                                <p>{order.date}</p>
                                                <p>€ {(order.cart.reduce((total, item) => 
    total + (item.installation 
        ? (item.product.price + item.product.installationPrice) * item.quantity 
        : (item.product.price * item.quantity)
    ), 0)).toFixed(2)
}</p>
                                                {/* {order.status == 'UNPAID' &&
                                                    // <a href={order.paymentUrl}>Pay</a>
                                                } */}
                                            </nav>
                                            <ul>
                                            {order.cart.map(item =>
                                                <li key={item.id}>
                                                    <img src={item.product.image}/>
                                                    <p>{item.product.name}</p>
                                                    {item.installation && (
                                                        <p>+ {t('product.installation')}</p>
                                                    )}
                                                    <h4>{item.quantity}</h4>
                                                </li>
                                            )}

                                        </ul>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}
