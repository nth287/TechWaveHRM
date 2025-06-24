import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './ModernNav.css';

const navLinks = [
  { to: '/dashboard', label: 'Dashboard' },
  { to: '/addleave', label: 'Add Leave' },
  { to: '/details', label: 'Details' },
  { to: '/manager', label: 'Manager' },
];

function ModernNav() {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="modern-nav">
      <div className="modern-nav__container">
        <div className="modern-nav__logo">TechWave HRM</div>
        <button className="modern-nav__toggle" onClick={() => setMenuOpen(!menuOpen)}>
          <span className="modern-nav__hamburger"></span>
        </button>
        <ul className={`modern-nav__links${menuOpen ? ' open' : ''}`}>
          {navLinks.map(link => (
            <li key={link.to} className="modern-nav__item">
              <Link
                to={link.to}
                className={`modern-nav__link${location.pathname === link.to ? ' active' : ''}`}
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}

export default ModernNav; 