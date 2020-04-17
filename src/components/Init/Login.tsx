import * as React from "react";

import { Input, Checkbox, Button, Form } from "antd";
import { useNavigateTo } from "../../navigation";
import styled from "styled-components";

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

const LoginWrap = styled.div`
  width: 50%;
  height: 50%;
  overflow: auto;
  margin: auto;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  border: solid black;
  text-align: center;
`;

export const LogIn = () => {
  const navigateTo = useNavigateTo();
  const onFinish = () => {
    navigateTo("home");
  };
  console.log("login");
  return (
    <LoginWrap>
      <Form
        {...layout}
        name="basic"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={() => {
          console.log("failed to finish login form ");
        }}
      >
        <Form.Item
          label="Username"
          name="username"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item {...tailLayout} name="remember" valuePropName="checked">
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </LoginWrap>
  );
};
