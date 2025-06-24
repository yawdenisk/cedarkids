import axios from 'axios';
import React, {useEffect, useState} from 'react'
import editIcon from '../images/edit.png'
import UpdateProductForm from './UpdateProductForm';
import UploadProductForm from './UploadProductForm';
import config from '../config'
import Products from './Products';
import { Link } from 'react-router-dom';
import addProductIcon from '../images/add-product-glyph-icon-vector.jpg'

export default function AdminPanel() {
    const [item, setItem] = useState('products');
    const [products, setProducts] = useState([]);
    useEffect(() => {
        axios.get(`${config.API_URL}/api/product/getAll`)
            .then(responce => {
                setProducts(responce.data);
            })
            .catch(error => {
                console.error(error);
            })
    }, []);
    return (
        <>
            <div className='container'>
                <div className='admin'>
                    <ul className='menu'>
                        <li onClick={() => setItem('products')}>Products</li>
                        <li onClick={() => setItem('orders')}>Orders</li>
                        <li onClick={() => setItem('blogs')}>Blogs</li>
                    </ul>
                    <div className='view'>
                        {item === 'products' && (
                             <div className='products'>
                                                <ul>
                                                    <li>
                                                        <Link to={'uploadProduct'}><img src={addProductIcon}
                                                                                                    alt='none image'></img></Link>
                                                            <p>Add product</p>
                                                    </li>
                                                    {products.map(product => (
                                                        <li key={product.id}>
                                                            <Link to={`product/${product.id}`}><img src={product.image}
                                                                                                    alt='none image'></img></Link>
                                                            <p>{product.name}</p>
                                                            <div className='price'>
                                                                <p>€{(product.price).toFixed(2)}</p>
                                                                <s>€{(product.lastPrice).toFixed(2)}</s>
                                                            </div>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}
