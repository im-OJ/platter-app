import { firebaseApp } from "../../renderer/App";
import { gql, useQuery, useMutation } from "@apollo/client";
import {
  Query,
  User,
  Mutation,
  MutationSignUpArgs,
} from "../../generated/graphql";
import { useState } from "react";
import keytar from "keytar";
import { useNavigateTo } from "../../navigation";
export type SingInParams = {
  email: string;
  pass: string;
};

const signInQuery = gql`
  query signInData {
    me {
      id
      username
      hasFullAccount
    }
  }
`;

type KeyTarName = "email" | "pass" | "token";

export const useLogOut = () => {
  const navigateTo = useNavigateTo();
  const deletePasswords = async () => {
    await keytar.deletePassword("main", "email");
    await keytar.deletePassword("main", "pass");
    await keytar.deletePassword("main", "token");
  };
  deletePasswords().then(() => {
    navigateTo("start");
  });
};

export const setKeytar = (name: KeyTarName, value: string) => {
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
  const { data, error } = useQuery<Query>(signInQuery);
  if (error) {
    console.error(error);
  }
  if (data && data.me && !user) {
    setUser(data.me);
  }

  return { user: user ?? null };
};

export const useSignInFirebase = (p: {
  onComplete: () => void;
  onFail?: () => void;
}) => {
  const mySetUserToken = (token: string) => {
    setKeytar("token", token);
  };
  return (params: SingInParams) => {
    firebaseApp
      .auth()
      .signInWithEmailAndPassword(params.email, params.pass)
      .then((t) => {
        if (firebaseApp && firebaseApp.auth && firebaseApp.auth().currentUser) {
          firebaseApp.auth().currentUser?.refreshToken;
          firebaseApp.auth();
          // @ts-ignore
          firebaseApp
            .auth()
            .currentUser.getIdToken(/* forceRefresh */ true)
            .then(function (idToken) {
              console.log("token set");
              mySetUserToken(idToken);
              setKeytar("email", params.email);
              setKeytar("pass", params.pass);
              p.onComplete();
            })
            .catch(function (error) {
              console.log("couldn't get token");
              p.onFail ? p.onFail() : null;
              return null;
            });
        }
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

export const useSignUpFirebase = () => {
  return useMutation<Mutation, MutationSignUpArgs>(signUpMuation);
};
