import * as React from "react";
import { useSignInFirebase, useSignUpMutation } from "./hooks";
import { useState, useEffect } from "react";
import { FirebaseForm } from "./FirebaseForm";
import { useKeytar } from "../../helpers/keytar";
import { useRefetch } from "../../hooks";
export const Login = (props: { onComplete: () => void }) => {
  const { value: storedEmail, setValue: setStoredEmail } = useKeytar("email");
  const { value: storedPass, setValue: setStoredPass } = useKeytar("password");
  const { setValue: setStoredToken } = useKeytar("token");
  const [loggedIn, setLoggedIn] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | undefined>();
  const [signUpMutation, { error, data }] = useSignUpMutation();
  const refetch = useRefetch(["StatusBarMe"]);
  useEffect(() => {
    if (storedEmail && storedPass) {
      signIn({
        email: storedEmail,
        pass: storedPass,
      });
    }
  }, [storedEmail, storedPass]);

  const signUp = (p: { email: string; pass: string }) => {
    setStoredEmail(null), setStoredPass(null), setStoredToken(null);

    signUpMutation({
      variables: {
        email: p.email,
        password: p.pass,
      },
    }).then(() => {
      console.log("signed up, signing in");
      signIn({
        ...p,
      });
    });
  };

  const signIn = useSignInFirebase({
    onComplete: (p) => {
      console.log("succesfully signed in", p.token.substr(0, 8));
      setStoredToken(p.token);
      setStoredEmail(p.email);
      setStoredPass(p.pass);
      setLoggedIn(true);
      console.log("refetching");
      refetch();
    },
    onFail: () => {
      setErrorMessage("Sign in failed, check connection");
      setStoredEmail(null);
      setStoredPass(null);
      setLoggedIn(false);
    },
  });

  if (loggedIn) {
    console.log(loggedIn);
    props.onComplete();
    return null;
  }
  if (data?.signUp?.id) {
    setLoggedIn(true);
    return null;
  }
  if (error && errorMessage !== error.message) {
    setErrorMessage(error.message);
  }

  return (
    <FirebaseForm
      onSignInSubmit={(email, pass) => signIn({ email, pass })}
      onSignUpSubmit={(email, pass) => signUp({ email, pass })}
      errorMessage={errorMessage}
    />
  );
};
