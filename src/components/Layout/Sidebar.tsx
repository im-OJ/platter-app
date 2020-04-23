import * as React from "react";
import { Menu } from "antd";
import { HomeOutlined, UploadOutlined } from "@ant-design/icons";
import { useNavigateTo } from "../../navigation";

export const Sidebar = () => {
  const navigateTo = useNavigateTo();
  return (
    <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
      <Menu.Item
        onClick={() => {
          navigateTo("home");
        }}
        key="1"
      >
        <HomeOutlined />
        <span className="nav-text">Home</span>
      </Menu.Item>
      <Menu.Item
        onClick={() => {
          navigateTo("upload");
        }}
        key="2"
      >
        <UploadOutlined />
        <span className="nav-text">Upload</span>
      </Menu.Item>
      <Menu.Item
        onClick={() => {
          navigateTo("test");
        }}
        key="3"
      >
        <UploadOutlined />
        <span className="nav-text">T</span>
      </Menu.Item>
    </Menu>
  );
};
