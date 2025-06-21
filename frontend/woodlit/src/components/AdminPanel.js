import axios from 'axios';
import React, {useEffect, useState} from 'react'
import editIcon from '../images/edit.png'
import addProductIcon from '../images/addProduct.png'
import UpdateProductForm from './UpdateProductForm';
import UploadProductForm from './UploadProductForm';
import config from '../config'

export default function AdminPanel() {
    const [item, setItem] = useState('orders');
    const [products, setProducts] = useState([]);
    const [currentProduct, setCurrentProduct] = useState(null);
    const [showUploadProductForm, setShowUploadProductForm] = useState(false);
    const [error, setError] = useState(false);
    useEffect(() => {
        axios.get(`${config.API_URL}/api/product/getAll`)
            .then(responce => {
                setProducts(responce.data);
            })
            .catch(error => {
                console.error(error);
            })
    }, []);

    function updateProduct(id) {
        setCurrentProduct(products.find(p => p.id == id));
        setItem("updateProduct")
    }

    return (
        <>
        {error &&
                     <div className="error">
                     <span>{error}</span>
                     <button className="close-btn" onClick={() => setError(false)}>×</button>
                     <div className="progress-bar"></div>
                 </div>
                }
        {showUploadProductForm && (
                <UploadProductForm setShowUploadProductForm= {setShowUploadProductForm}/>
            )
        }
            <div className='container'>
                <div className='adminPanel'>
                        <div className='menu'>
                            <button>Orders</button>
                            <button onClick={() => setItem("products")}>Products</button>
                        </div>
                    <div className='view'>
                        <div className='products'>
                        <button onClick={() => setShowUploadProductForm(true)}>Add product</button>
                        <ul>
                            {item == "products" && (
                                products.map(product =>
                                    <li key={product.id}>
                                        <img src={product.image}/>
                                        <p>{product.name}</p>
                                        <button onClick={() => updateProduct(product.id)}>Edit <img src={editIcon}/></button>
                                    </li>
                                )
                            )}
                            {item == "updateProduct" && 
                            <UpdateProductForm currentProduct={currentProduct} setCurrentProduct= {setCurrentProduct}/>
                            }
                        </ul>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
