import React from 'react';
import {Link} from 'react-router-dom';

export default function Footer() {
    return (<footer className="footer">
            <div className="container">
                <div className="footer-content">
                    <div className="footer-section">
                        <h3>CedarKids</h3>
                        <p>Quality wooden products for your home</p>
                    </div>

                    <div className="footer-section">
                        <h4>Navigation</h4>
                        <ul>
                            <li><Link to="/">Swing Sets</Link></li>
                            <li><Link to="/shipping">Shipping</Link></li>
                            <li><Link to="/blogs">Blog</Link></li>
                            <li><Link to="/assembly">Assembly</Link></li>
                            <li><Link to="/about">About Us</Link></li>
                        </ul>
                    </div>

                    <div className="footer-section">
                        <h4>Contact</h4>
                        <ul>
                            <li>Email: info@cedarkids.com</li>
                            <li>Phone: +1 234 567 890</li>
                            <li>Address: 123 Wood Street</li>
                        </ul>
                    </div>

                    <div className="footer-section">
                        <h4>Follow Us</h4>
                        <div className="social-links">
                            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a>
                            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a>
                        </div>
                    </div>
                </div>

                <div className="footer-bottom">
                    <p>&copy; {new Date().getFullYear()} CedarKids. All rights reserved.</p>
                    <p className="creator">Created by <a href="https://github.com/yawdenisk" target="_blank"
                                                         rel="noopener noreferrer">Denys Ivashchenko</a></p>
                </div>
            </div>
        </footer>);
}
