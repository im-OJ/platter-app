import * as React from "react";
import { useKeytar, useSignInFirebase, useSignUpMutation } from "./hooks";
import { useState } from "react";
import { useNavigateTo } from "../../navigation";
import { FirebaseForm } from "./FirebaseForm";

export const Login = () => {
  const [storedEmail, setStoredEmail] = useKeytar("email");
  const [storedPass, setStoredPass] = useKeytar("pass");
  const [loggedIn, setLoggedIn] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | undefined>();
  const navigateTo = useNavigateTo();
  const [signUpMutation, { error }] = useSignUpMutation();

  if (error && errorMessage !== error.message) {
    setErrorMessage(error.message);
  }

  const signUp = (p: { email: string; pass: string }) => {
    signUpMutation({
      variables: {
        email: p.email,
        password: p.pass,
      },
    });
  };

  const signIn = useSignInFirebase({
    onComplete: (p) => {
      console.log("succesfully signed in", p.token.substr(0, 8));
      setStoredEmail(p.email);
      setStoredPass(p.pass);
      setLoggedIn(true);
    },
    onFail: () => {
      setErrorMessage("sign in failed");
      setStoredEmail(null);
      setStoredPass(null);
      setLoggedIn(false);
    },
  });
  if (loggedIn) {
    navigateTo("home");
    return null;
  }

  if (storedEmail && storedPass) {
    signIn({
      email: storedEmail,
      pass: storedPass,
    });
    return null;
  }

  return (
    <FirebaseForm
      onSignInSubmit={(email, pass) => signIn({ email, pass })}
      onSignUpSubmit={(email, pass) => signUp({ email, pass })}
      errorMessage={errorMessage}
    />
  );
};
