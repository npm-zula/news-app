import React from 'react';

const Footer = () => {
  return (
    <footer style={styles.footer}>
      <p style={styles.footerText}>
        &copy; 2023 My Blog. All rights reserved.
      </p>
      <div style={styles.footerSocial}>
        <a href="#" style={styles.socialLink}>
          <i className="fab fa-facebook"></i>
        </a>
        <a href="#" style={styles.socialLink}>
          <i className="fab fa-twitter"></i>
        </a>
        <a href="#" style={styles.socialLink}>
          <i className="fab fa-instagram"></i>
        </a>
      </div>
    </footer>
  );
};

const styles = {
  footer: {
    backgroundColor: '#2196F3',
    padding: '40px',
    textAlign: 'center',
  },
  footerText: {
    color: '#FFF',
    fontSize: '14px',
    margin: '0',
  },
  footerSocial: {
    marginTop: '20px',
  },
  socialLink: {
    color: '#FFF',
    fontSize: '24px',
    margin: '0 10px',
  },
};

export default Footer;
