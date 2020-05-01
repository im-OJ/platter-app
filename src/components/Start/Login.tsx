import * as React from "react";

import styled from "styled-components";
import { FirebaseForm } from "./FirebaseForm";
import { CompleteAccountForm } from "./CompleteAccountForm";
import { useState } from "react";

import { useGetKeytar } from "./hooks";
const LoginWrap = styled.div``;

export const LogIn = (props: { onSignInComplete: () => void }) => {
  const { email: savedEmail, pass: savedPass } = useGetSavedLogin();
  const [form, setForm] = useState<"firebase" | "completeAccount">("firebase");
  const token = useGetKeytar("token");
  console.log("token: ", token);
  if (savedEmail && savedPass && form !== "completeAccount") {
    setForm("completeAccount");
  }
  return (
    <LoginWrap>
      {form === "firebase" && (
        <FirebaseForm
          onComplete={() => {
            setForm("completeAccount");
          }}
        />
      )}
      {form === "completeAccount" && (
        <CompleteAccountForm
          onComplete={() => {
            props.onSignInComplete();
          }}
        />
      )}
    </LoginWrap>
  );
};

export const useGetSavedLogin = () => {
  const email = useGetKeytar("email");
  const pass = useGetKeytar("pass");
  return { email, pass };
};
