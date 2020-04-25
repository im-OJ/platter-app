import * as React from "react";
import { UserOutlined } from "@ant-design/icons";
import { Form, Input, Button } from "antd";
import { useState, useEffect } from "react";
import { useSignInApi } from "./hooks";

export const CompleteAccountForm = (props: { onComplete: () => void }) => {
  console.log("here");
  const [usernameValue, setUsernameValue] = useState("");
  const [signIn, user] = useSignInApi();
  useEffect(() => {
    signIn(); // attempt to sign in on load
  }, []);
  if (!user) {
    console.log("no user returning null");
    return null;
  }
  if (user.hasFullAccount) {
    console.log("user has full account, signing in");
    // close
    props.onComplete();
    return null;
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
          value={usernameValue}
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
            signIn();
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
