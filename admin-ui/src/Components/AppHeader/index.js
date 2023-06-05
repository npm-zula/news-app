import React, { useEffect, useState } from "react";
import { BellFilled, MailOutlined, UserOutlined, SettingOutlined } from "@ant-design/icons";
import { Badge, Drawer, Image, List, Space, Typography, Menu, Dropdown } from "antd";
import { getComments, getOrders } from "../../API";
import image from "./logo.png";

function AppHeader() {
  const [comments, setComments] = useState([]);
  const [orders, setOrders] = useState([]);
  const [commentsOpen, setCommentsOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  useEffect(() => {
    getComments().then((res) => {
      setComments(res.comments);
    });
    getOrders().then((res) => {
      setOrders(res.products);
    });
  }, []);

  const handleMenuClick = ({ key }) => {
    if (key === "profile") {
      // Handle profile click
    } else if (key === "settings") {
      // Handle settings click
    }
  };

  const menu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="profile" icon={<UserOutlined />}>
        Profile
      </Menu.Item>
      <Menu.Item key="settings" icon={<SettingOutlined />}>
        Settings
      </Menu.Item>
    </Menu>
  );

  return (
    <header style={styles.header}>
      <div style={styles.logoContainer}>
        <Image width={50} src={image} preview={false} />
        <Typography.Title level={4} style={styles.logoText}>
          News App Admin Panel
        </Typography.Title>
      </div>
      <div style={styles.iconsContainer}>
        <Badge count={comments.length} dot>
          <MailOutlined
            style={styles.icon}
            onClick={() => {
              setCommentsOpen(true);
            }}
          />
        </Badge>
        <Badge count={orders.length}>
          <BellFilled
            style={styles.icon}
            onClick={() => {
              setNotificationsOpen(true);
            }}
          />
        </Badge>
        <Dropdown overlay={menu} trigger={["click"]}>
          <a className="ant-dropdown-link" onClick={(e) => e.preventDefault()}>
            <UserOutlined style={styles.icon} />
          </a>
        </Dropdown>
      </div>
      <Drawer
        title="Comments"
        placement="right"
        width={400}
        onClose={() => {
          setCommentsOpen(false);
        }}
        visible={commentsOpen}
        maskClosable
      >
        <List
          dataSource={comments}
          renderItem={(item) => {
            return <List.Item>{item.body}</List.Item>;
          }}
        />
      </Drawer>
      <Drawer
        title="Notifications"
        placement="right"
        width={400}
        onClose={() => {
          setNotificationsOpen(false);
        }}
        visible={notificationsOpen}
        maskClosable
      >
        <List
          dataSource={orders}
          renderItem={(item) => {
            return (
              <List.Item>
                <Typography.Text strong>{item.title}</Typography.Text> has been ordered!
              </List.Item>
            );
          }}
        />
      </Drawer>
    </header>
  );
}

const styles = {
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#000",
    padding: "10px 20px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    
  },
  logoContainer: {
    display: "flex",
    alignItems: "center",
  },
  logoText: {
    margin: "0",
    fontWeight: "bold",
    textAlign: "center",
    color: "#fff",
    alignItems: "center",
    marginLeft: "500px",
    fontSize: "xx-large",
    fontfamily: "Arial, sans-serif",
  },
  
  iconsContainer: {
    display: "flex",
    alignItems: "center",
  },
  icon: {
    fontSize: "24px",
    marginLeft: "20px",
    color: "#fff",
    cursor: "pointer",
  },
};

export default AppHeader;
