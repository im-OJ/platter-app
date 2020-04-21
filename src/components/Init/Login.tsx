import * as React from "react";

import { Input, Checkbox, Button, Form } from "antd";
import { useNavigateTo } from "../../navigation";
import styled from "styled-components";
import { firebaseApp, useGlobalState } from "../../renderer/App";
import { useState } from "react";

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
        {...layout}
        name="basic"
        initialValues={{ remember: true }}
        onFinishFailed={() => {
          console.log("failed to finish login form ");
        }}
      >
        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input
            value={emailValue}
            onChange={(e) => {
              setEmailValue(e.target.value);
            }}
          />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[
            { required: true, message: "Please input your password!", min: 6 },
          ]}
        >
          <Input.Password
            value={passValue}
            onChange={(e) => {
              setPassValue(e.target.value);
            }}
          />
        </Form.Item>

        <Form.Item {...tailLayout} name="remember" valuePropName="checked">
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <Form.Item {...tailLayout}>
          <Button
            type="primary"
            htmlType="submit"
            onClick={() => {
              signUp();
            }}
          >
            Sign Up
          </Button>
        </Form.Item>
        <Form.Item {...tailLayout}>
          <Button
            type="primary"
            htmlType="submit"
            onClick={() => {
              signIn({
                email: emailValue,
                pass: passValue,
              });
            }}
          >
            Sign In
          </Button>
        </Form.Item>
      </Form>
    </LoginWrap>
  );
};
