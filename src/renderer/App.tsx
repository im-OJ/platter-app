import * as React from "react";
import { Navigator } from "../navigation";
import { Layout } from "antd";
import { useState } from "react";
import { createGlobalState } from "react-hooks-global-state";
import { setContext } from "apollo-link-context";
import { createHttpLink } from "apollo-link-http";
export const { useGlobalState } = createGlobalState({
  location: "start",
  token: "token-not-set",
});
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { config } from "../config";
import firebase from "firebase";
import "antd/dist/antd.css";
import "ant-design-pro/dist/ant-design-pro.css";
import { Sidebar } from "../components/Layout/Sidebar";
import { useGetKeytar } from "../components/Start/hooks";

const isProd = !require("electron-is-dev");

console.log("Is production: ", isProd);
export const firebaseApp = firebase.initializeApp(config.firebaseOptios);

const onStart = () => {
  console.log("started");
};

export const App = () => {
  const userToken = useGetKeytar("token");
  const [siderCollapsed, setSiderCollapsed] = useState(true);

  const { Sider, Content } = Layout;

  React.useEffect(() => {
    onStart();
  }, []);

  // todo extract all this out, store token with keytar NOT global hook
  const authLink = setContext((_, { headers }) => {
    // get the authentication token from local storage if it exists
    const token = userToken;
    // return the headers to the context so httpLink can read them
    return {
      headers: {
        ...headers,
        authorization: token ? token : "no-token",
      },
    };
  });
  console.log("api: ", config.apiUrl);
  const httpLink = createHttpLink({
    uri: config.apiUrl,
  });

  const client = new ApolloClient({
    cache: new InMemoryCache(),
    // @ts-ignore
    link: authLink.concat(httpLink),
    headers: {
      authorization: userToken || "no-token",
    },
    body: {},
  });

  return (
    <ApolloProvider client={client}>
      <Layout
        style={{
          userSelect: "none",
        }}
      >
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
          <Sidebar />
        </Sider>
        <Layout
          className="site-layout"
          style={{
            marginLeft: siderCollapsed ? 80 : 200,

            height: "100%",
          }}
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
