import React, {useEffect, useState} from 'react'
import axios from 'axios';
import {Link} from 'react-router-dom';
import loading from '../images/loading.svg'

export default function Products() {
    const [products, setProducts] = useState([]);
    useEffect(() => {
        axios.get('http://localhost:8081/product/getAll')
            .then(responce => {
                setProducts(responce.data);
            })
            .catch(error => {
                console.error(error);
            })
    }, []);
    if (products.length == 0) {
        return <div className='loading'><img src={loading} alt='none gif'></img></div>
    }
    return (
        <>
            <div className='container'>
                <div className='products'>
                    <div className='filter'>
                        <button>Sort by</button>
                    </div>
                    <ul>
                        {products.map(product => (
                            <li key={product.id}>
                                <Link to={`product/${product.id}`}><img src={product.image}
                                                                        alt='none image'></img></Link>
                                <p>{product.name}</p>   
                                <div className='price'>
                                <s>€ {product.lastPrice}</s>
                                <p>€ {product.price}</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </>
    )
}
