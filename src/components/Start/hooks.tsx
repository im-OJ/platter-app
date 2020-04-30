import { useGlobalState, firebaseApp } from "../../renderer/App";
import { useNavigateTo } from "../../navigation";
import { useMutation, gql, useQuery } from "@apollo/client";
import { Mutation, Query, User } from "../../generated/graphql";
import { useState } from "react";
import keytar from "keytar";
export type SingInParams =
  | {
      email: string;
      pass: string;
    }
  | {
      token: string;
    };

const signInQuery = gql`
  query signInData {
    me {
      _id
      username
      email
      hasFullAccount
    }
  }
`;

export const setKeytar = (name: string, value: string) => {
  console.log("setting keytar", value);
  keytar.setPassword("main", name, value).catch(console.error);
};

export const useGetKeytar = (name: string) => {
  const [value, setValue] = useState<string | null>(null);
  keytar
    .getPassword("main", name)
    .then((v) => setValue(v))
    .catch(console.error);
  return value;
};
export const useSignInApi = (): { user: User | null } => {
  const [user, setUser] = useState<User | null>(null);
  const { data, error, loading } = useQuery<Query>(signInQuery);
  if (error) {
    console.error(error);
  }
  if (data && data.me && !user) {
    setUser(data.me);
  }

  return { user: user ?? null };
};

export const useSignInFirebase = (p: { onComplete: () => void }) => {
  const userToken = useGetKeytar("token");
  const mySetUserToken = (token: string) => {
    setKeytar("token", token);
  };
  const navigateTo = useNavigateTo();

  return (params: SingInParams) => {
    if ("email" in params) {
      firebaseApp
        .auth()
        .signInWithEmailAndPassword(params.email, params.pass)
        .then((t) => {
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
                mySetUserToken(idToken);
                p.onComplete();
              })
              .catch(function (error) {
                console.error;
              });
          }
          navigateTo("home");
        })
        .catch(console.error);
    } else {
      if (userToken) {
        firebaseApp
          .auth()
          .signInWithCustomToken(userToken)
          .then((e) => {
            if (e.user?.email) {
              p.onComplete();
            } else {
              console.log("Error firebase sign in failed");
              throw new Error("couldnt sign in");
            }
          })
          .catch(console.error);
      } else {
        console.log("tried to sign in with no user token");
      }
    }
  };
};

const signUpAPI = gql`
  mutation userSignUp {
    signUp {
      _id
      email
    }
  }
`;
export const useSignUpFirebase = (p: { onComplete: () => void }) => {
  return (email: string, pass: string) => {
    firebaseApp
      .auth()
      .createUserWithEmailAndPassword(email, pass)
      .then(() => {
        p.onComplete();
      })
      .catch(console.error);
  };
};
