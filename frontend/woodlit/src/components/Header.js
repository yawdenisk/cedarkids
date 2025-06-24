import React, {useState} from 'react'
import {Link} from 'react-router-dom'
import instagram from '../images/instagram.png';
import facebook from '../images/facebook.png';
import logoIcon from '../images/logo.jpg';
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
                    <Link onClick={() => setIsOpen(!isOpen)} to="/assembly">Assembly</Link>
                    <Link onClick={() => setIsOpen(!isOpen)} to="/shipping">Shipping</Link>
                    <Link onClick={() => setIsOpen(!isOpen)} to="/blogs">Blog</Link>
                </div>
            )}
            <div className='container'>
                <header>
                    <div className='headerLeft'>
                        <a href='/'><img src={instagram} alt='none logo'/></a>
                        <a href='/'><img src={facebook} alt='none logo'/></a>
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
                        <a><img src={searchIcon} alt='none image'/></a>
                    </div>
                    <Link to="/"><img style={{width: '100px'}} className='logo' src={logoIcon}
                                      alt='none image'></img></Link>
                    <div className='headerRight'>
                        {/* <Link to="/admin"><img src={adminIcon} alt='none logo'/></Link> */}
                        <Link to="/user"><img src={profileIcon} alt='none image'/></Link>
                        <Link to="/cart"><span>{cart.length}</span><img src={cartIcon} alt='none image'/></Link>
                    </div>
                </header>
                <div className='navigation'>
                    <Link to="/">Swing Sets</Link>
                    <Link to="/shipping">Shipping</Link>
                    <Link to="/blogs">Blog</Link>
                    <Link to="/assembly">Assembly</Link>
                    <Link to="/about">About Us</Link>
                </div>
            </div>
        </>
    )
}
