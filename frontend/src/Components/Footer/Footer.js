import React from 'react';
import './Footer.css';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="footer">
            <div className="footer-content">
                <div className="footer-section">
                    <h3>Quick Links</h3>
                    <ul>
                        <li><a href="/dashboard">Dashboard</a></li>
                        <li><a href="/addleave">Add Leave</a></li>
                        <li><a href="/details">Details</a></li>
                        <li><a href="/manager">Manager Dashboard</a></li>
                    </ul>
                </div>
                <div className="footer-section">
                    <h3>Support</h3>
                    <ul>
                        <li><a href="/help">Help Center</a></li>
                        <li><a href="/contact">Contact Us</a></li>
                        <li><a href="/documentation">Documentation</a></li>
                    </ul>
                </div>
                <div className="footer-section">
                    <h3>Legal</h3>
                    <ul>
                        <li><a href="/privacy">Privacy Policy</a></li>
                        <li><a href="/terms">Terms of Service</a></li>
                    </ul>
                </div>
            </div>
            <div className="footer-bottom">
                <p>&copy; {currentYear} TechWave HRM. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;