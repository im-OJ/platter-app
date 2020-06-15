import * as React from "react";
import { Menu } from "antd";
import {
  HomeOutlined,
  UploadOutlined,
  UserOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { useNavigateTo } from "../../navigation";
import { siderWidth } from "../../theme";

const iconSize = 20;

export const Sidebar = () => {
  const navigateTo = useNavigateTo();
  return (
    <Menu
      theme="dark"
      mode="inline"
      defaultSelectedKeys={["1"]}
      style={{ textAlign: "center", width: siderWidth }}
    >
      <Menu.Item
        onClick={() => {
          navigateTo("home");
        }}
        key="1"
        style={{
          padding: 0,
        }}
      >
        <HomeOutlined size={iconSize} />
        <span className="nav-text">Home</span>
      </Menu.Item>

      <Menu.Item
        onClick={() => {
          navigateTo("upload");
        }}
        key="2"
        style={{
          padding: 0,
        }}
      >
        <UploadOutlined size={iconSize} />

        <span className="nav-text">Upload</span>
      </Menu.Item>
      <Menu.Item
        onClick={() => {
          navigateTo("myProfile");
        }}
        style={{
          padding: 0,
        }}
        key="3"
      >
        <UserOutlined size={iconSize} />
        <span className="nav-text">Profile</span>
      </Menu.Item>
      <Menu.Item
        onClick={() => {
          navigateTo("settings");
        }}
        style={{
          padding: 0,
          bottom: 0,
        }}
        key="4"
      >
        <SettingOutlined size={iconSize} />
        <span className="nav-text">Settings</span>
      </Menu.Item>
    </Menu>
  );
};
