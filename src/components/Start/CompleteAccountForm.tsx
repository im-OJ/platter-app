import * as React from "react";
import { UserOutlined } from "@ant-design/icons";
import { Form, Input, Button } from "antd";
import { useState } from "react";

export const CompleteAccountForm = (props: { onComplete: () => void }) => {
  const [usernameValue, setUsernameValue] = useState("");
  usernameValue;
  // if account is complete call props.onComplete

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
            // setUsername();
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
