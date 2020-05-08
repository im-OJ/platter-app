import { firebaseApp } from "../../renderer/App";
import { useMutation, gql } from "@apollo/client";
import { Mutation, MutationSignUpArgs } from "@/generated/graphql";
import { useKeytar } from "../../Interaction/keytar";

export type SingInParams = {
  email: string;
  pass: string;
};

export const useSignInFirebase = (p: {
  onComplete: (p: { email: string; pass: string; token: string }) => void;
  onFail?: () => void;
}) => {
  const { setValue: setKeytarToken } = useKeytar("token");
  return (params: SingInParams) => {
    firebaseApp.auth().onAuthStateChanged((e) => {
      e?.getIdToken(true).then((token) => {
        console.log("auth state changed, updating token");
        setKeytarToken(token);
      });
    });

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
