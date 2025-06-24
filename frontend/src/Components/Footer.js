import React from 'react';
import './Footer.css';

function Footer() {
  return (
    <footer className="app-footer">
      <div>
        &copy; {new Date().getFullYear()} TechWave HRM. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer; 