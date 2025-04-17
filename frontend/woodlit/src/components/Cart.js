    import React, {useEffect, useState} from 'react';
    import deleteIcon from '../images/delete.png';
    import emptyIcon from '../images/empty.png';
    import axios from 'axios';
    import {Link, useNavigate} from 'react-router-dom';

    export default function Cart({cart, setCart}) {
        const totalPrice = cart.reduce((total, item) => 
            total + (item.installation 
                ? (item.product.price + item.product.installationPrice) * item.quantity 
                : item.product.price * item.quantity
            ), 0);
        
        const [email, setEmail] = useState(null);
        const [firstName, setFirstName] = useState(null);
        const [lastName, setLastName] = useState(null);
        const [city, setCity] = useState(null);
        const [country, setCountry] = useState(null);
        const [phone, setPhone] = useState(null);
        const [postalCode, setPostalCode] = useState(null);
        const [address, setAddress] = useState(null);
        const navigate = useNavigate();
        const [userDetails, setUserDetails] = useState(null);
        const [error, setError] = useState(null);
        const [selectedDelivery, setSelectedDelivery] = useState(null);

        async function fetchUserDetails() {
            try {
                const response = await axios.get('http://localhost:8081/user/getUserDetails', {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem("access_tocken")}`
                    }
                })
                setUserDetails(response.data);
            } catch (error) {
                setUserDetails(null)
            }
        }

        useEffect(() => {
            fetchUserDetails();
        }, [])

        if (cart.length == 0) {
            return (
                <div className='cartEmpty'>
                    <p>Cart is empty</p>
                    <img src={emptyIcon}></img>
                </div>
            )
        }

        async function createOrder() {
            const response = await axios.post('http://localhost:8081/order/create', {
                    cart,
                    user: {
                        email: email || userDetails.email,
                        firstName: firstName || userDetails.firstName,
                        lastName: lastName || userDetails.lastName,

                    },
                    deliveryDetails: selectedDelivery || {
                        city: city,
                        country: country,
                        phone: phone,
                        postalCode: postalCode,
                        address: address
                    }
                }
            );
            window.location.href = response.data;
        }

        function increaseQuantity(id) {
            setCart(
                cart.map(item =>
                    item.product.id == id ? {...item, quantity: item.quantity + 1} : item
                )
            )
        }

        function decreaseQuantity(id) {
            setCart(
                cart.map(item =>
                    item.product.id == id && item.quantity > 1 ? {...item, quantity: item.quantity - 1} : item
                )
            )
        }

        function deleteItem(id) {
            setCart(
                cart.filter(item =>
                    item.product.id != id
                )
            )
        }

        return (
            <>
                <div className='container'>
                    <div className='cart'>
                        <ul>
                            {cart.map(item => (
                                <li key={item.product.id}>
                                    <img src={item.product.image} alt='none image'></img>
                                    <div className='text-area'>
                                    <p>{item.product.name}</p>
                                    <p>{item.installation ? "installation + € "+ (item.product.installationPrice * item.quantity).toFixed(2) : null}</p>
                                    </div>
                                    <div className='counters'>
                                        <button onClick={() => decreaseQuantity(item.product.id)}>-</button>
                                        <p>{item.quantity}</p>
                                        <button onClick={() => increaseQuantity(item.product.id)}>+</button>
                                    </div>
                                    <p>€ {(item.installation ? (item.product.price + item.product.installationPrice) * item.quantity : item.product.price * item.quantity).toFixed(2)}</p>
                                    <button onClick={() => deleteItem(item.product.id)}><img src={deleteIcon}/></button>
                                </li>
                            ))}
                            <form>
                                <p>Delivery</p>
                                {userDetails == null && (
                                    <>
                                        <input onChange={(e) => setFirstName(e.target.value)} placeholder='First Name'
                                            name='firstName' required/>
                                        <input onChange={(e) => setLastName(e.target.value)} placeholder='Last Name'
                                            name='lastName' required/>
                                        <input onChange={(e) => setEmail(e.target.value)} placeholder='Email' name='email'
                                            required/>
                                        <input onChange={(e) => setPhone(e.target.value)} placeholder='Phone' name='phone'
                                            required/>
                                        <input onChange={(e) => setCountry(e.target.value)} placeholder='Country'
                                            name='country'
                                            required/>
                                        <input onChange={(e) => setCity(e.target.value)} placeholder='City' name='city'
                                            required/>
                                        <input onChange={(e) => setPostalCode(e.target.value)} placeholder='Postal Code'
                                            name='postalCode' required/>
                                        <input onChange={(e) => setAddress(e.target.value)} placeholder='Address'
                                            name='adress'
                                            required/>
                                    </>
                                )}
                                {userDetails != null && Array.isArray(userDetails.deliveryDetails) && (
                                    <ul key={selectedDelivery?.id || 'no-selection'}>
                                        <button onClick={() => navigate('/user')}>Add new address</button>
                                        {userDetails.deliveryDetails.map((item) => (
                                            <li style={{border: selectedDelivery?.id === item.id ? '2px solid green' : '1 px solid rgb(121, 227, 121)'}}
                                                onClick={() => {
                                                    setSelectedDelivery(item);
                                                    console.log("Selected delivery: ", item);
                                                }} key={item.id}>
                                                <p>Phone: {item.phone}</p>
                                                <p>Country: {item.country}</p>
                                                <p>City: {item.city}</p>
                                                <p>Address: {item.address}</p>
                                                <p>Postal Code: {item.postalCode}</p>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                                {userDetails != null && userDetails.deliveryDetails.length == 0 && (

                                    <>
                                        <input onChange={(e) => setPhone(e.target.value)} placeholder='Phone' name='phone'
                                            required/>
                                        <input onChange={(e) => setCountry(e.target.value)} placeholder='Country'
                                            name='country'
                                            required/>
                                        <input onChange={(e) => setCity(e.target.value)} placeholder='City' name='city'
                                            required/>
                                        <input onChange={(e) => setPostalCode(e.target.value)} placeholder='Postal Code'
                                            name='postalCode' required/>
                                        <input onChange={(e) => setAddress(e.target.value)} placeholder='Address'
                                            name='adress'
                                            required/>
                                    </>
                                )}
                            </form>
                        </ul>
                        <div className='shipment'>
                            <p>Summary</p>
                            <p>Delivery: free</p>
                            <p>Total price: € {totalPrice.toFixed(2)}</p>
                            <Link onClick={createOrder}>Pay</Link>
                            <Link to="/">Continue shopping</Link>
                        </div>
                    </div>
                </div>
            </>
        )
    }
