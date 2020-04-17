import * as React from "react";
import { Navigator, useNavigateTo } from "../navigation";
import "antd/dist/antd.css";
import { Layout, Menu } from "antd";
import { useState } from "react";
import { createGlobalState } from "react-hooks-global-state";

export const { useGlobalState } = createGlobalState({ location: "home" });

export const App = () => {
  const [siderCollapsed, setSiderCollapsed] = useState(false);
  const navigateTo = useNavigateTo();
  const { Sider } = Layout;
  return (
    <Layout>
      <Sider
        collapsible
        collapsed={siderCollapsed}
        onCollapse={setSiderCollapsed}
      >
        <Menu>
          <Menu.Item
            onClick={() => {
              navigateTo("home");
            }}
            key="1"
          >
            Home
          </Menu.Item>
          <Menu.Item
            onClick={() => {
              console.log("navigating to upload");
              navigateTo("upload");
            }}
            key="1"
          >
            Upload
          </Menu.Item>
        </Menu>
      </Sider>
      <Navigator />
    </Layout>
  );
};
