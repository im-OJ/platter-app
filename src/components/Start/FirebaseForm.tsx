import * as React from "react";
import { Form, Input, Button, Typography } from "antd";
import { LockOutlined, MailOutlined } from "@ant-design/icons";
import { useState } from "react";

export const FirebaseForm = (props: {
  errorMessage?: string;
  onSignInSubmit: (email: string, pass: string) => void;
  onSignUpSubmit: (email: string, pass: string) => void;
}) => {
  const [emailValue, setEmailValue] = useState("");
  const [passValue, setPassValue] = useState("");
  const onSignInClick = () => {
    props.onSignInSubmit(emailValue, passValue);
  };
  const onSignUpClick = () => {
    props.onSignUpSubmit(emailValue, passValue);
  };
  return (
    <Form
      name="normal_login"
      initialValues={{
        remember: true,
      }}
    >
      <Form.Item
        name="email"
        rules={[
          {
            required: true,
            message: "Please input your email!",
          },
        ]}
      >
        <Input
          prefix={<MailOutlined />}
          placeholder="Email"
          value={emailValue}
          onChange={(e) => {
            setEmailValue(e.target.value);
          }}
        />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[
          {
            required: true,

            message: "Please input your Password!",
          },
        ]}
      >
        <Input
          prefix={<LockOutlined />}
          type="password"
          placeholder="Password"
          value={passValue}
          onChange={(e) => {
            setPassValue(e.target.value);
          }}
        />
      </Form.Item>

      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          onClick={() => {
            onSignInClick();
          }}
          style={{
            width: "100%",
          }}
        >
          Log in
        </Button>
      </Form.Item>

      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          onClick={() => {
            onSignUpClick();
          }}
          style={{
            width: "100%",
          }}
        >
          Sign Up
        </Button>
      </Form.Item>
      <Typography style={{ color: "red" }}>{props.errorMessage}</Typography>
    </Form>
  );
};
