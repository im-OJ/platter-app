import * as React from "react";
import { UserOutlined } from "@ant-design/icons";
import { Form, Input, Button } from "antd";
import { useState } from "react";
import { useSignInApi } from "./hooks";
import { useMutation, gql } from "@apollo/client";
import { Mutation, MutationSetUsernameArgs } from "../../generated/graphql";

const setUsernameMutation = gql`
  mutation setUsername($name: String!) {
    setUsername(name: $name)
  }
`;

export const CompleteAccountForm = (props: { onComplete: () => void }) => {
  const [usernameValue, setUsernameValue] = useState("");

  const [setUsername, { data: hasSetUsername }] = useMutation<
    Mutation["setUsername"],
    MutationSetUsernameArgs
  >(setUsernameMutation, {
    variables: { name: usernameValue ?? "" },
  });

  const { user } = useSignInApi();

  if (user?.hasFullAccount || hasSetUsername) {
    console.log("user has full account, signing in");
    console.log(user?.hasFullAccount, hasSetUsername);
    // close
    props.onComplete();
    return null;
  }
  console.log("user does not have full account showing form");
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
          type="primary"
          htmlType="submit"
          onClick={() => {
            setUsername();
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
