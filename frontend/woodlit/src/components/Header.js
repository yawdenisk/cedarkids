import React, {useEffect, useState} from 'react'
import {Link} from 'react-router-dom'
import instagram from '../images/instagram.png';
import facebook from '../images/facebook.png';
import logoIcon from '../images/logo.jpg';
import searchIcon from '../images/search.png';
import profileIcon from '../images/profile.png';
import cartIcon from '../images/cart.png';
import adminIcon from '../images/admin.png';
import { useTranslation } from "react-i18next";

export default function Header({cart}) {
    const [isOpen, setIsOpen] = useState(false);
    const { t, i18n } = useTranslation();
useEffect(() => {
  if (isOpen) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = 'auto'; 
  }
  return () => {
    document.body.style.overflow = 'auto';
  };
}, [isOpen]);
    return (
        <>
               <div className={`bMenu ${isOpen ? 'active' : ''}`}>
  <Link onClick={() => setIsOpen(!isOpen)} to="/">{t("header.swingSets")}</Link>
  <Link onClick={() => setIsOpen(!isOpen)} to="/shipping">{t("header.shipping")}</Link>
  <Link onClick={() => setIsOpen(!isOpen)} to="/contacts">{t("header.contacts")}</Link>
  {/* <Link onClick={() => setIsOpen(!isOpen)} to="/blogs">{t("header.blog")}</Link> */}
  <Link onClick={() => setIsOpen(!isOpen)} to="/assembly">{t("header.assembly")}</Link>
  <Link onClick={() => setIsOpen(!isOpen)} to="/about">{t("header.about")}</Link>
</div>
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
  <Link to="/">{t("header.swingSets")}</Link>
  <Link to="/shipping">{t("header.shipping")}</Link>
  <Link to="/contacts">{t("header.contacts")}</Link>
  {/* <Link to="/blogs">{t("header.blog")}</Link> */}
  <Link to="/assembly">{t("header.assembly")}</Link>
  <Link to="/about">{t("header.about")}</Link>
</div>
            </div>
        </>
    )
}
