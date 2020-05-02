import * as React from "react";
import { useState } from "react";
import gql from "graphql-tag";
import { Query, Mutation, MutationUpdateUserArgs } from "@/generated/graphql";
import { useQuery, useMutation } from "@apollo/client";
import { Form, Input, Button } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useLogOut } from "./hooks";

const meQuery = gql`
  query {
    me {
      hasFullAccount
    }
  }
`;

const writeUsername = gql`
  mutation($data: UpdateUser) {
    updateUser(data: $data) {
      id
      username
      hasFullAccount
    }
  }
`;

export const CompleteAccountForm = (props: { onComplete: () => void }) => {
  const [usernameValue, setUsernameValue] = useState("");
  const [setUsername, { data: newData, error: newError, called }] = useMutation<
    Mutation,
    MutationUpdateUserArgs
  >(writeUsername);
  const { data: currentData, loading, error } = useQuery<
    Query,
    MutationUpdateUserArgs
  >(meQuery);
  const logOut = () => useLogOut();
  if (loading) {
    console.log(error);
    return null;
  }
  if (error) {
    console.log("unable to retrieve existing user");
  } else {
    console.log("old data: " + JSON.stringify(currentData));
    console.log("new data: " + JSON.stringify(newData));
  }
  console.log("new error: ", newError?.message, called);

  // if account is complete call props.onComplete
  if (
    (currentData && currentData.me?.hasFullAccount) ||
    newData?.updateUser?.hasFullAccount
  ) {
    console.log("full account :)");
    props.onComplete();
  }

  return (
    <Form
      name="normal_login"
      initialValues={{
        remember: true,
      }}
    >
      <Form.Item
        name="username"
        rules={[
          {
            required: true,
            message: "Username",
          },
        ]}
      >
        <Input
          prefix={<UserOutlined />}
          placeholder="Username"
          value={"usernameValue"}
          onChange={(e) => {
            setUsernameValue(e.target.value);
          }}
        />
      </Form.Item>
      <Form.Item>
        <Button
          type="link"
          htmlType="submit"
          onClick={() => {
            logOut();
          }}
          style={{
            width: "100%",
          }}
        >
          back
        </Button>
      </Form.Item>
      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          onClick={() => {
            setUsername({
              variables: {
                data: {
                  username: usernameValue,
                },
              },
            });
          }}
          style={{
            width: "100%",
          }}
        >
          Log in
        </Button>
      </Form.Item>
    </Form>
  );
};
