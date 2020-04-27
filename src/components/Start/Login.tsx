import * as React from "react";

import styled from "styled-components";
import { FirebaseForm } from "./FirebaseForm";
import { CompleteAccountForm } from "./CompleteAccountForm";
import { useState } from "react";

const LoginWrap = styled.div``;

export const LogIn = (props: { onSignInComplete: () => void }) => {
  const [form, setForm] = useState<"firebase" | "completeAccpunt">("firebase");

  return (
    <LoginWrap>
      {form === "firebase" && (
        <FirebaseForm
          onComplete={() => {
            setForm("completeAccpunt");
          }}
        />
      )}
      {form === "completeAccpunt" && (
        <CompleteAccountForm
          onComplete={() => {
            props.onSignInComplete();
          }}
        />
      )}
    </LoginWrap>
  );
};
