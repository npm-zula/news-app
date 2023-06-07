import React from 'react';
import logo from './logo.png'; // Import your logo image

const Header = () => {
  return (
    <header style={styles.header}>
      <div style={styles.headerLeft}>
        <img src={logo} alt="Logo" style={styles.logo} />
      </div>
      <h1 style={styles.headerTitle}>Author Panel</h1>
      <div style={styles.headerRight}>
        <div style={styles.headerFeature}>
          <i className="fas fa-pencil-alt" style={styles.featureIcon}></i>
          <span style={styles.featureText}>Create</span>
        </div>
        <div style={styles.headerFeature}>
          <i className="fas fa-search" style={styles.featureIcon}></i>
          <span style={styles.featureText}>Search</span>
        </div>
        <div style={styles.headerFeature}>
          <i className="fas fa-heart" style={styles.featureIcon}></i>
          <span style={styles.featureText}>Like</span>
        </div>
        <div style={styles.headerFeature}>
          <i className="fas fa-share-alt" style={styles.featureIcon}></i>
          <span style={styles.featureText}>Share</span>
        </div>
      </div>
    </header>
  );
};

const styles = {
  header: {
    backgroundColor: '#333',
    padding: '20px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerLeft: {
    display: 'flex',
    alignItems: 'center',
  },
  logo: {
    width: '100px',
    height: '40px',
    marginRight: '10px',
  },
  headerTitle: {
    color: '#fff',
    fontSize: '36px',
    margin: '0',
    textTransform: 'uppercase',
    letterSpacing: '2px',
  },
  headerRight: {
    display: 'flex',
    alignItems: 'center',
  },
  headerFeature: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginLeft: '20px',
    color: '#fff',
    fontSize: '14px',
  },
  featureIcon: {
    fontSize: '24px',
    marginBottom: '10px',
  },
  featureText: {
    fontSize: '12px',
    textTransform: 'uppercase',
  },
};

export default Header;
