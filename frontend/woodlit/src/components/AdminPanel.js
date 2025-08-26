import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import config from '../config';
import loading from '../images/loading.svg';
import addProductIcon from '../images/add-product-glyph-icon-vector.jpg';
export default function AdminPanel() {
  const [item, setItem] = useState('products');
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [loadingOrders, setLoadingOrders] = useState(true);
    const navigate = useNavigate();
  useEffect(() => {
    axios.get(`${config.API_URL}/api/product/getAll`)
      .then(response => {
        setProducts(response.data);
      })
      .catch(console.error)
      .finally(() => setLoadingProducts(false));

 axios.get(`${config.API_URL}/api/order/getAllOrders`, {
    headers: {
                    'Authorization': `Bearer ${localStorage.getItem("access_tocken")}`
                },
  })
    .then(response => setOrders(response.data))
    .catch(error => {
      if (error.response && (error.response.status === 401 || error.response.status === 403)) {
        setOrders(null);
      } else {
        console.error(error);
      }
    })
    .finally(() => setLoadingOrders(false));
  }, []);

  function deleteProduct(id) {
    axios.delete(`${config.API_URL}/api/product/delete/${id}`)
      .then(() => {
        setProducts(prev => prev.filter(product => product.id !== id));
      })
      .catch(console.error);
  }

  if ((item === 'products' && loadingProducts) || (item === 'orders' && loadingOrders)) {
    return <div className='loading'><img src={loading} alt='Loading...' /></div>;
  }
  if (orders === null) {
    navigate("/404", { replace: true });
    return null;
  }
  return (
    <div className='container'>
      <div className='admin'>
        <ul className='menu'>
          <li onClick={() => setItem('products')}>Products</li>
          <li onClick={() => setItem('orders')}>Orders</li>
          <li onClick={() => setItem('blogs')}>Blogs</li>
        </ul>

        <div className='view'>
          {item === 'products' && (
            <ul className='products'>
              <li>
                <Link to="uploadProduct">
                  <img src={addProductIcon} alt='Add product' />
                </Link>
                <p>Add product</p>
              </li>
              {products.map(product => (
                <li key={product.id}>
                  <Link to={`updateProduct/${product.id}`}>
                    <img src={product.image} alt={product.name} />
                  </Link>
                  <p>{product.name}</p>
                  <div className='price'>
                    <p>€{product.price.toFixed(2)}</p>
                    <s>€{product.lastPrice.toFixed(2)}</s>
                  </div>
                  <span onClick={() => deleteProduct(product.id)}>X</span>
                </li>
              ))}
            </ul>
          )}

          {item === 'orders' && (
            <div className="orders">
              {orders.map(order => (
                <div key={order.id} className="order-card">
                  <div className="order-header">
                    <h2>Order #{order.id}</h2>
                    <span className={`status ${order.status.toLowerCase()}`}>{order.status}</span>
                    <span className="date">{order.date}</span>
                  </div>

                  <div className="delivery-details">
                    <h3>Delivery Details</h3>
                    <p>{order.deliveryDetails.address}, {order.deliveryDetails.city}, {order.deliveryDetails.country}</p>
                    <p>Email: {order.user.email}</p>
                    <p>Phone: {order.deliveryDetails.phone}</p>
                    <p>Postal Code: {order.deliveryDetails.postalCode}</p>
                  </div>

                  <div className="cart-items">
                    {order.cart.map(item => (
                      <div key={item.id} className="cart-item">
                        <img src={item.product.image} alt={item.product.name} />
                        <div className="item-info">
                          <h4>{item.product.name}</h4>
                          <p>{item.product.description}</p>
                          <p>Quantity: {item.quantity}</p>
                          <p>Price: €{item.product.price.toFixed(2)}</p>
                          <p>Installation: {item.installation ? "Yes" : "No"}</p>
                          {item.product.gallery && item.product.gallery.length > 0 && (
                            <div className="gallery">
                              {item.product.gallery.map(img => (
                                <img key={img.id} src={img.imageUrl} alt="gallery" />
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
