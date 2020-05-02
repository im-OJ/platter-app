import * as React from "react";
import { Form, Input, Checkbox, Button, Typography } from "antd";
import { useState } from "react";
import { LockOutlined, MailOutlined } from "@ant-design/icons";
import { useSignInFirebase, useSignUpFirebase } from "./hooks";

export const FirebaseForm = (props: { onComplete: () => void }) => {
  const [emailValue, setEmailValue] = useState("");
  const [passValue, setPassValue] = useState("");
  const [errorMessage, setErrorMessage] = useState<null | string>(null);

  const signIn = useSignInFirebase({
    onComplete: () => props.onComplete(),
    onFail: () => setErrorMessage("Error signing in"),
  });

  const [signUp, { error }] = useSignUpFirebase();

  if (error && errorMessage !== error.message) {
    setErrorMessage(error.message);
  }
  const onSignUpClick = () => {
    signUp({
      variables: { email: emailValue, password: passValue },
    })
      .then(() => {
        console.log("signed up");
        onSignInClick();
      })
      .catch((e) => {
        console.error(e);
        // setErrorMessage("Error signing up");
      });
  };
  const onSignInClick = () =>
    signIn({
      email: emailValue,
      pass: passValue,
    });
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
      <Typography style={{ color: "red" }}>{errorMessage}</Typography>
    </Form>
  );
};
