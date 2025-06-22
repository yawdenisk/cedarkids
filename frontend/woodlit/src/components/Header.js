import React, {useState} from 'react'
import {Link} from 'react-router-dom'
import instagram from '../images/instagram.png';
import facebook from '../images/facebook.png';
import logo from '../images/logo.avif';
import searchIcon from '../images/search.png';
import profileIcon from '../images/profile.png';
import cartIcon from '../images/cart.png';
import adminIcon from '../images/admin.png';
export default function Header({cart}) {
    const [isOpen, setIsOpen] = useState(false);
    return (
       <>
       {isOpen && (
        <div className='bMenu'>
            <Link onClick={() => setIsOpen(!isOpen)} to="/about">About Us</Link>
            <Link onClick={() => setIsOpen(!isOpen)} to="/">Swing Sets</Link>
            <Link onClick={() => setIsOpen(!isOpen)} to="/">Assembly</Link>
            <Link onClick={() => setIsOpen(!isOpen)} to="/shipping">Shipping</Link>
            <Link onClick={() => setIsOpen(!isOpen)} to="/">Blog</Link>
        </div>
       )}
        <div className='container'>
            <header>
                <div className='headerMedia'>
                    <a href='/'><img src={instagram} alt='none logo'/></a>
                    <a href='/'><img src={facebook} alt='none logo'/></a>
                    {/* <Link to="/admin"><img src={adminIcon} alt='none logo'/></Link> */}
                </div>
                <div className='burgerMenu'>
                    <button
                        className={isOpen ? 'active' : ''}
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        <span></span>
                        <span></span>
                        <span></span>
                    </button>
                    <a href='/'><img src={searchIcon} alt='none logo'/></a>
                </div>
                <Link to="/"><img className='logo' src={logo} alt='none logo'></img></Link>
                <div className='headerNavbar'>
                    <Link to="/user"><img src={profileIcon} alt='none logo'/></Link>
                    <Link to="/cart"><span>{cart.length}</span><img src={cartIcon} alt='none logo'/></Link>
                </div>
            </header>
            <div className='navigation'>
                <Link to="/about">About Us</Link>
                <Link to="/">Swing Sets</Link>
                <Link to="/">Assembly</Link>
                <Link to="/shipping">Shipping</Link>
                <Link to="/">Blog</Link>
            </div>
        </div>
       </>
    )
}
