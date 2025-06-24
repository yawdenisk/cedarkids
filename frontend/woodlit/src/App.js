import Footer from "./components/Footer";
import Header from "./components/Header";
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Products from "./components/Products";
import ProductDetails from "./components/ProductDetails";
import UserPanel from "./components/UserPanel";
import Login from "./components/Login";
import React, {useState} from 'react'
import Registration from "./components/Registration";
import Cart from "./components/Cart";
import AdminPanel from "./components/AdminPanel";
import Shipping from "./components/Shipping";
import AboutUs from "./components/AboutUs";
import Assembly from "./components/Assembly";
import Blogs from "./components/Blogs";
import BlogDetails from "./components/BlogDetails";
import UploadProductForm from "./components/UploadProductForm";

function App() {
     const [cart, setCart] = useState([]);
    return (
        <Router>
            <Header cart={cart}/>
            <Routes>
                <Route path="/" element={<Products/>}></Route>
                <Route path="/product/:id" element={<ProductDetails cart={cart} setCart={setCart}/>}></Route>
                <Route path="/user" element={<UserPanel/>}></Route>
                <Route path="/shipping" element={<Shipping/>}></Route>
                <Route path="/login" element={<Login/>}></Route>
                <Route path="/register" element={<Registration/>}></Route>
                <Route path="/cart" element={<Cart cart={cart} setCart={setCart}/>}></Route>
                <Route path="/admin" element={<AdminPanel/>}></Route>
                <Route path="/about" element={<AboutUs/>}></Route>
                <Route path="/assembly" element={<Assembly/>}></Route>
                 <Route path="/blogs" element={<Blogs/>}></Route>
                 <Route path="/blog/:id" element={<BlogDetails/>}></Route>
                 <Route path="/admin/uploadProduct" element={<UploadProductForm/>}></Route>
            </Routes>
            <Footer/>
        </Router>
    )
}

export default App;
