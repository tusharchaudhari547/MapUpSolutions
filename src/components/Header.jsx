// Header.js
import React, { useState } from "react";
import { Button, Menu } from "antd";
import { UserOutlined, LoginOutlined, LogoutOutlined } from "@ant-design/icons";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
const AppHeader = ({ collapsed, handleCollapsedChange }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Dummy login state, false by default

  const handleLoginLogout = () => {
    setIsLoggedIn((prevIsLoggedIn) => !prevIsLoggedIn);
  };

  return (
    <div>
      
      <Menu mode="horizontal" theme="" selectable={false}>
      <Button
          type="text"
          icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          onClick={() => handleCollapsedChange()}
          style={{
            fontSize: "16px",
            width: 64,
            height: 64,
          }}
        />
        <Menu.Item key="logo" style={{ marginRight: "20px" }}>
          M@pup.ai
        </Menu.Item>
        <Menu.Item
          key="profile"
          icon={<UserOutlined />}
        
        >
          Profile
        </Menu.Item>
        {isLoggedIn ? (
          <Menu.Item
            key="logout"
            icon={<LogoutOutlined />}
            onClick={handleLoginLogout}
            
          >
            Logout
          </Menu.Item>
        ) : (
          <Menu.Item
            key="login"
            icon={<LoginOutlined />}
            onClick={handleLoginLogout}
            style={{ marginRight: "20px", float: "right" }}
          >
            Login
          </Menu.Item>
        )}
      </Menu>
    </div>
  );
};

export default AppHeader;
