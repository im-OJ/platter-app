import * as React from "react";
import { LogIn } from "../Start/Login";
const Test = () => (
  <>
    <LogIn
      onSignInComplete={() => {
        console.log("signed in");
      }}
    />
  </>
);

export default Test;
