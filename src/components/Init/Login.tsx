import * as React from "react";

import { Input, Checkbox, Button, Form } from "antd";
import { useNavigateTo } from "../../navigation";
import styled from "styled-components";
import { firebaseApp, useGlobalState } from "../../renderer/App";
import { useState } from "react";
import { LockOutlined, MailOutlined } from "@ant-design/icons";

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

const LoginWrap = styled.div``;

type SingInParams =
  | {
      email: string;
      pass: string;
    }
  | {
      token: string;
    };
const useSignIn = (settings: { onComplete: () => void }) => {
  const [userToken, setUserToken] = useGlobalState("token");

  const mySetUserToken = (token: string) => {
    setUserToken(token);
  };
  const navigateTo = useNavigateTo();

  return (params: SingInParams) => {
    if ("email" in params) {
      firebaseApp
        .auth()
        .signInWithEmailAndPassword(params.email, params.pass)
        .then((t) => {
          console.log("sign in complete ", t);
          if (
            firebaseApp &&
            firebaseApp.auth &&
            firebaseApp.auth().currentUser
          ) {
            // @ts-ignore
            firebaseApp
              .auth()
              .currentUser.getIdToken(/* forceRefresh */ true)
              .then(function (idToken) {
                // Send token to your backend via HTTPS
                // ...
                mySetUserToken(idToken);
                settings.onComplete();
              })
              .catch(function (error) {
                console.error;
              });
          } else {
            console.log("error getting user");
          }

          navigateTo("home");
        })
        .catch(console.error);
    } else {
      firebaseApp
        .auth()
        .signInWithCustomToken(userToken)
        .then(() => {
          console.log("sign in complete");
          navigateTo("home");
        })
        .catch(console.error);
    }
  };
};

export const LogIn = (props: { onSignInComplete: () => void }) => {
  const [emailValue, setEmailValue] = useState("");
  const [passValue, setPassValue] = useState("");
  const navigateTo = useNavigateTo();
  const signIn = useSignIn({ onComplete: props.onSignInComplete });

  const signUp = () => {
    firebaseApp
      .auth()
      .createUserWithEmailAndPassword(emailValue, passValue)
      .then(() => {
        console.log("signup complete");
        signIn({
          email: emailValue,
          pass: passValue,
        });
        navigateTo("home");
      })
      .catch(console.error);
  };

  return (
    <LoginWrap>
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
              signUp();
            }}
            style={{
              width: "100%",
            }}
          >
            Sign Up
          </Button>
        </Form.Item>
      </Form>
    </LoginWrap>
  );
};
