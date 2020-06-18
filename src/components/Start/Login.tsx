import * as React from "react";
import { useSignInFirebase, useSignUpMutation } from "./hooks";
import { useState, useEffect } from "react";
import { FirebaseForm } from "./FirebaseForm";
import { useKeytar } from "../../helpers/keytar";
import { useRefetch } from "../../hooks";
import { ready } from "../../helpers/remote";
import { Spin } from "antd";

export const Login = (props: { onComplete: () => void }) => {
  const { value: storedEmail, setValue: setStoredEmail, loading: loadingEmail } = useKeytar("email");
  const { value: storedPass, setValue: setStoredPass, loading: loadingPass } = useKeytar("password");
  const { setValue: setStoredToken } = useKeytar("token");
  const [loggedIn, setLoggedIn] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | undefined>();
  const [showForm, setShowForm] = useState(false)
  const [signUpMutation, { error, data }] = useSignUpMutation();
  const refetch = useRefetch(["StatusBarMe"]);
  useEffect(() => {
    if (storedEmail && storedPass) {
      signIn({
        email: storedEmail,
        pass: storedPass,
      });
    }else{
      
      console.log("showing form no stored details")
      if(!loadingEmail && !loadingPass){
        ready();
        setShowForm(true)
      }
    }
  }, [storedEmail, storedPass, loadingEmail, loadingPass]);

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
      setShowForm(false)
      console.log("refetching");
      refetch();
    },
    onFail: () => {
      setErrorMessage("Sign in failed");
      console.log("sign in failed")
      setStoredEmail(null);
      setStoredPass(null);
      setLoggedIn(false);
      setShowForm(true)
      ready();
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
  if(!showForm){
    return <Spin />
  }
  return (
    <FirebaseForm
      onSignInSubmit={(email, pass) => signIn({ email, pass })}
      onSignUpSubmit={(email, pass) => signUp({ email, pass })}
      errorMessage={errorMessage}
    />
  );
};
