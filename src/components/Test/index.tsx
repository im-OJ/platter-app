import * as React from "react";
import { LogIn } from "../Init/Login";
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
