import * as React from "react";
import { Navigator, useNavigateTo } from "../navigation";
import "antd/dist/antd.css";
import { Layout, Menu } from "antd";
import { useState } from "react";
import { createGlobalState } from "react-hooks-global-state";
import { HomeOutlined, UploadOutlined } from "@ant-design/icons";
export const { useGlobalState } = createGlobalState({ location: "init" });
import {
  ApolloClient,
  HttpLink,
  InMemoryCache,
  ApolloProvider,
} from "@apollo/client";
import { config } from "../config";

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({
    uri: config.apiUrl,
  }),
});

export const App = () => {
  const [siderCollapsed, setSiderCollapsed] = useState(false);
  const navigateTo = useNavigateTo();
  const { Sider, Content } = Layout;
  return (
    <ApolloProvider client={client}>
      <Layout>
        <Sider
          collapsible
          style={{
            overflow: "auto",
            height: "100%",
            position: "fixed",
            left: 0,
          }}
          collapsed={siderCollapsed}
          onCollapse={setSiderCollapsed}
        >
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
                console.log("navigating to upload");
                navigateTo("upload");
              }}
              key="2"
            >
              <UploadOutlined />
              <span className="nav-text">Upload</span>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout
          className="site-layout"
          style={{ marginLeft: siderCollapsed ? 64 : 200, height: "100%" }}
        >
          <Content style={{ margin: "4px 4px 4px 4px", overflow: "initial" }}>
            <div
              className="site-layout-background"
              style={{ padding: 0, textAlign: "center" }}
            >
              <Navigator />
            </div>
          </Content>
        </Layout>
      </Layout>
    </ApolloProvider>
  );
};
