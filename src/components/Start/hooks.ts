import keytar from "keytar";
import { useState } from "react";
import { firebaseApp } from "../../renderer/App";
import { useMutation, gql } from "@apollo/client";
import { Mutation, MutationSignUpArgs } from "@/generated/graphql";

export type SingInParams = {
  email: string;
  pass: string;
};

const setKeytar = (name: string, value: string | null) => {
  console.log("setting keytar ", name, value);
  if (!value) {
    keytar.deletePassword("main", name);
    return;
  }
  keytar.setPassword("main", name, value).catch(console.error);
};

const useGetKeytar = (name: string) => {
  const [value, setValue] = useState<string | null>(null);
  keytar
    .getPassword("main", name)
    .then((v) => setValue(v))
    .catch(console.error);
  return value;
};

export const useKeytar = (
  name: string
): [string | null, (value: string | null) => void] => {
  return [useGetKeytar(name), (value: string | null) => setKeytar(name, value)];
};

export const useSignInFirebase = (p: {
  onComplete: (p: { email: string; pass: string; token: string }) => void;
  onFail?: () => void;
}) => {
  return (params: SingInParams) => {
    console.log("signign in firebase", params.email);
    firebaseApp
      .auth()
      .signInWithEmailAndPassword(params.email, params.pass)
      .then((t) => {
        // @ts-ignore
        firebaseApp
          .auth()
          .currentUser.getIdToken(/* forceRefresh */ true)
          .then(function (idToken) {
            p.onComplete({
              token: idToken,
              email: params.email,
              pass: params.pass,
            });
          })
          .catch(function (error) {
            p.onFail ? p.onFail() : null;
            return null;
          });
      })
      .catch(() => {
        console.log("couldn't sign in");
        p.onFail ? p.onFail() : null;
        return null;
      });
  };
};

const signUpMuation = gql`
  mutation SignUp($email: String!, $password: String!) {
    signUp(email: $email, password: $password) {
      id
    }
  }
`;

export const useSignUpMutation = () => {
  return useMutation<Mutation, MutationSignUpArgs>(signUpMuation);
};
