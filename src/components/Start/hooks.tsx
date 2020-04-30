import { useGlobalState, firebaseApp } from "../../renderer/App";
import { useNavigateTo } from "../../navigation";
import { useMutation, gql, useQuery } from "@apollo/client";
import { Mutation, Query, User } from "../../generated/graphql";
import { useState } from "react";
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

export const useSignInApi = (): { user: User | null } => {
  const [user, setUser] = useState<User | null>(null);
  const { data, error, loading } = useQuery<Query>(signInQuery);
  console.log(data, loading, error);
  if (error) {
    console.error(error);
  }
  if (data && data.me && !user) {
    setUser(data.me);
  }

  return { user: user ?? null };
};

export const useSignInFirebase = (p: { onComplete: () => void }) => {
  const [userToken, setUserToken] = useGlobalState("token"); // TODO: Change this to keytar

  const mySetUserToken = (token: string) => {
    console.log("user token" + token);
    setUserToken(token);
  };
  const navigateTo = useNavigateTo();

  return (params: SingInParams) => {
    if ("email" in params) {
      console.log("signing in with email/pass");

      firebaseApp
        .auth()
        .signInWithEmailAndPassword(params.email, params.pass)
        .then((t) => {
          console.log("firebase sign in complete ", t);
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
          } else {
            console.log("error getting user");
          }

          navigateTo("home");
        })
        .catch(console.error);
    } else {
      firebaseApp
        .auth()
        .signInWithCustomToken(userToken)
        .then(() => {
          console.log("firebase sign in complete");
          p.onComplete();
        })
        .catch(console.error);
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
        console.log("Firebase sign up complete, signing in");
        p.onComplete();
      })
      .catch(console.error);
  };
};
