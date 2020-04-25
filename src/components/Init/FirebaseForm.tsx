import * as React from "react";
import { Form, Input, Checkbox, Button } from "antd";
import { useState } from "react";
import { LockOutlined, MailOutlined } from "@ant-design/icons";
import { useSignIn, useSignUp } from "./hooks";

export const FirebaseForm = (props: { onSignInComplete: () => void }) => {
  const [emailValue, setEmailValue] = useState("");
  const [passValue, setPassValue] = useState("");

  const signIn = useSignIn({ onComplete: props.onSignInComplete });

  const signUp = useSignUp();
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
        <Form.Item name="remember" valuePropName="checked" noStyle>
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <a
          className="login-form-forgot"
          href=""
          style={{
            float: "right",
          }}
        >
          Forgot password
        </a>
      </Form.Item>

      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          onClick={() => {
            signIn({
              email: emailValue,
              pass: passValue,
            });
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
            signUp(emailValue, passValue);
          }}
          style={{
            width: "100%",
          }}
        >
          Sign Up
        </Button>
      </Form.Item>
    </Form>
  );
};
