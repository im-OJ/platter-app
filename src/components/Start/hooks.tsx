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

const signInMutation = gql`
  mutation signIn {
    me {
      _id
      username
      email
      hasFullAccount
    }
  }
`;

export const useSignInApi = (): [(p?: any) => Promise<any>, User | null] => {
  const [user, setUser] = useState<User | null>(null);
  const [signInApi, { data, error }] = useMutation<Mutation>(signInMutation);
  if (error) {
    console.error(error);
  }

  setUser(data ? data.signIn ?? null : null);
  return [signInApi, user];
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
export const useSignUp = (p: { onComplete: () => void }) => {
  const [signUpMutation, response] = useMutation<Mutation["signUp"]>(signUpAPI);
  if (response.data) {
    console.log(response.data, response.error);
  }

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
