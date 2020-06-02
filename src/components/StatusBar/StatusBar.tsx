import * as React from "react";
import { gql, useQuery } from "@apollo/client";
import { Query } from "@/generated/graphql";
import { Row, Typography, Menu, Dropdown } from "antd";
import { Col } from "../Sample";
import { backgroundCol } from "../../theme";
import { config } from "../../config";
import { UsernameForm } from "../UsernameForm";
import { useSignOut } from "../Start/hooks";

// @ts-ignore

const meQuery = gql`
  query StatusBarMe {
    me {
      id
      username
    }
  }
`;
export const useUsername = () => {
  const { data } = useQuery<Query>(meQuery);
  if (data) {
    return data.me?.username;
  }
  return name;
};

const UsernameMenu = (props: { children: JSX.Element }) => {
  const logout = useSignOut();
  const menu = (
    <Menu>
      <Menu.Item
        key="1"
        onClick={() => {
          logout();
        }}
      >
        Log out
      </Menu.Item>
    </Menu>
  );

  return <Dropdown overlay={menu}>{props.children}</Dropdown>;
};

export const StatusBar = () => {
  const { data, loading } = useQuery<Query>(meQuery);
  return (
    <>
      {data && !data?.me?.username && <UsernameForm />}
      <div
        style={{
          position: "fixed",
          bottom: 0,
          backgroundColor: backgroundCol,
          borderColor: "black",
          borderTopWidth: 2,
          height: 24,

          width: "100%",
        }}
      >
        <Row>
          <Col size={4}>
            {!loading ? (
              <UsernameMenu>
                <Typography style={{ color: "white" }}>
                  User: {data?.me?.username}
                </Typography>
              </UsernameMenu>
            ) : (
              <Typography>Loading</Typography>
            )}
          </Col>
          <Col size={8}>
            <Typography style={{ color: "white" }}>{config.apiUrl}</Typography>
          </Col>
        </Row>
      </div>
    </>
  );
};
