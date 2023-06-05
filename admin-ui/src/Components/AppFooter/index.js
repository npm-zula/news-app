import { Typography } from "antd";

function AppFooter() {
  return (
    <div className="AppFooter" style={styles.footer}>
      <Typography.Link href="https://www.instagram.com/abdu11ah_malik/" target="_blank" style={styles.link}>
        Contact Us
      </Typography.Link>
      <Typography.Link href="https://www.google.com" target="_blank" style={styles.link}>
        Privacy Policy
      </Typography.Link>
      <Typography.Link href="https://www.google.com" target="_blank" style={styles.link}>
        Terms of Use
      </Typography.Link>
    </div>
  );
}

const styles = {
  footer: {
    backgroundColor: "#283747",
    padding: "20px",
    display: "flex",
    justifyContent: "center",
  },
  link: {
    color: "#ffffff",
    margin: "0 10px",
    fontSize: "14px",
    textDecoration: "none",
  },
};

export default AppFooter;
