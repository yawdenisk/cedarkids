import React from 'react';
import {Link} from 'react-router-dom';

export default function Footer() {
    return (<footer className="footer">
            <div className="container">
                <div className="footer-content">
                    <div className="footer-section">
                        <h3>CedarKids</h3>
                        <p>Email: info@cedarkids.eu</p>
                        <p>Phone: <a href='tel:+48452816914'>+48 452 816 914</a></p>
                        <p>Address: Ul. Brzozowa 36/3, 85-154 Bydgoszcz, Polska </p>
                    </div>

                    <div className="footer-section">
                        <h4>Navigation</h4>
                        <ul>
                            <li><Link to="/">Swing Sets</Link></li>
                            <li><Link to="/shipping">Shipping</Link></li>
                            <li><Link to="/contacts">Contacts</Link></li>
                            <li><Link to="/assembly">Assembly</Link></li>
                            <li><Link to="/about">About Us</Link></li>
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
