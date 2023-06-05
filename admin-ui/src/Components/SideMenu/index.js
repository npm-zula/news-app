import {
  AppstoreOutlined,
  CommentOutlined,
  BookFilled,
  UserOutlined,
  FormOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function SideMenu() {
  const location = useLocation();
  const [selectedKeys, setSelectedKeys] = useState("/");

  useEffect(() => {
    const pathName = location.pathname;
    setSelectedKeys(pathName);
  }, [location.pathname]);

  const navigate = useNavigate();
  return (
    <div className="SideMenu">
      <Menu
        className="SideMenuVertical"
        mode="vertical"
        onClick={(item) => {
          //item.key
          navigate(item.key);
        }}
        selectedKeys={[selectedKeys]}
        items={[
          {
            label: "Dashbaord",
            icon: <AppstoreOutlined />,
            key: "/",
          },
          {
            label: "Articles",
            key: "/articles",
            icon: <BookFilled />,
          },
          
          {
            label: "Comments",
            key: "/comments",
            icon: <CommentOutlined />,
          },
          {
            label: "Users",
            key: "/users",
            icon: <UserOutlined />,
          },

          {
            label: "Forums",
            key: "/forums",
            icon: <FormOutlined />,
          },
          
          
        ]}
      ></Menu>
    </div>
  );
}
export default SideMenu;
