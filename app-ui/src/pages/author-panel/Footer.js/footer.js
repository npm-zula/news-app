import React from 'react';

const Footer = () => {
  return (
    <footer style={styles.footer}>
      <p style={styles.footerText}>© 2023 My Blog. All rights reserved.</p>
    </footer>
  );
};

const styles = {
  footer: {
    backgroundColor: '#333',
    padding: '40px',
    textAlign: 'center',
  },
  footerText: {
    color: '#fff',
    fontSize: '14px',
    margin: '0',
  },
};

export default Footer;
