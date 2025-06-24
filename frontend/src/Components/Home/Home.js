import React from 'react';

function Home() {
  return (
    <div style={styles.page}>
      {/* Navbar */}
      <nav style={styles.nav}>
        <div style={styles.navLinks}>
          <a href="#home" style={styles.navLink}>Home</a>
          <a href="#vacancy" style={styles.navLink}>Vacancy</a>
          <a href="#contact" style={styles.navLink}>Contact</a>
          <a href="#login" style={styles.navLink}>Login</a>
        </div>
      </nav>

      {/* Header */}
      <header style={styles.header}>
        <h1 style={styles.headerText}>Welcome to TechWave HRM</h1>
        <p style={styles.tagline}>Your one-stop solution for HR management</p>
      </header>

      {/* Footer */}
      <footer style={styles.footer}>
        <p style={styles.footerText}>© 2025 TechWave HRM. All rights reserved.</p>
      </footer>
    </div>
  );
}

const styles = {
  page: {
    margin: '0',
    fontFamily: 'Arial, sans-serif',
    height: '100vh',
    background: 'linear-gradient(to bottom, #f4f4f4, #e8e8e8)',
    display: 'flex',
    flexDirection: 'column', // Align items vertically
    justifyContent: 'space-between', // Space out content
    textAlign: 'center',
  },
  nav: {
    backgroundColor: '#444',
    display: 'flex',
    justifyContent: 'center',
    padding: '15px 20px',
    position: 'fixed',
    top: '0',
    left: '0',
    width: '100%',
    zIndex: '1000',
  },
  navLinks: {
    display: 'flex',
    gap: '20px',
  },
  navLink: {
    color: 'white',
    padding: '10px 20px',
    textDecoration: 'none',
    fontSize: '18px',
    fontWeight: 'bold',
    transition: 'background-color 0.3s ease',
    cursor: 'pointer',
  },
  navLinkHover: {
    backgroundColor: '#555',
  },
  header: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    paddingTop: '80px', // Adjust for navbar height
    textAlign: 'center',
  },
  headerText: {
    fontSize: '50px',
    fontWeight: 'bold',
    color: '#333',
    marginBottom: '10px',
  },
  tagline: {
    fontSize: '18px',
    color: '#666',
  },
  footer: {
    backgroundColor: '#444',
    color: 'white',
    textAlign: 'center',
    padding: '15px',
    width: '100%',
    position: 'relative',
    bottom: '0',
  },
  footerText: {
    fontSize: '14px',
  },
};

export default Home;
