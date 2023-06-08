import React from 'react';
import logo from './logo.png';

const UserHeader = () => {
  return (
    <header style={styles.header}>
      <div style={styles.headerLeft}>
        <img src={logo} alt="Logo" style={styles.logo} />
        <h1 style={styles.headerTitle}>Community Panel</h1>
      </div>
      <div style={styles.headerRight}>
        <div style={styles.headerFeature}>
          <i className="fas fa-home" style={styles.featureIcon}></i>
          <span style={styles.featureText}>Home</span>
        </div>
        <div style={styles.headerFeature}>
          <i className="fas fa-info-circle" style={styles.featureIcon}></i>
          <span style={styles.featureText}>About</span>
        </div>
        <div style={styles.headerFeature}>
          <i className="fas fa-user" style={styles.featureIcon}></i>
          <span style={styles.featureText}>Profile</span>
        </div>
        <div style={styles.headerFeature}>
          <i className="fas fa-envelope" style={styles.featureIcon}></i>
          <span style={styles.featureText}>Contact Us</span>
        </div>
      </div>
    </header>
  );
};

const styles = {
  header: {
    backgroundColor: '#2196F3',
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
    width: '90px',
    height: '40px',
    marginRight: '10px',
  },
  headerTitle: {
    color: '#FFF',
    fontSize: '24px',
    margin: '0',
    textTransform: 'uppercase',
    letterSpacing: '2px',
    marginLeft: '400px',
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
    color: '#FFF',
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

export default UserHeader;
