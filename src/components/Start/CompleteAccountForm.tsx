import * as React from "react";
import { UserOutlined } from "@ant-design/icons";
import { Form, Input, Button } from "antd";
import { useState } from "react";
import { useSignInApi } from "./hooks";
import { useMutation } from "@apollo/client";

export const CompleteAccountForm = (props: { onComplete: () => void }) => {
  // const [usernameValue, setUsernameValue] = useState("");
  const [mounted, setMounted] = useState(false);
  // const [setUsername] = useMutation<Mutation["setUsername"]
  //  todo next: finish above
  const { user } = useSignInApi();

  // if (!mounted) {
  //   console.log("Attempting sign in");
  //   setMounted(true);
  //   return null;
  // }
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
            // setUsernameValue(e.target.value);
          }}
        />
      </Form.Item>

      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          onClick={() => {
            // signIn();
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
