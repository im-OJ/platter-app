import * as React from "react";

import { Input, Checkbox, Button, Form } from "antd";
import styled from "styled-components";
import { useState } from "react";

import { FirebaseForm } from "./FirebaseForm";

const LoginWrap = styled.div``;

export const LogIn = (props: { onSignInComplete: () => void }) => {
  return (
    <LoginWrap>
      <FirebaseForm onSignInComplete={props.onSignInComplete} />
    </LoginWrap>
  );
};
