import { useGlobalState, firebaseApp } from "../../renderer/App";
import { useNavigateTo } from "../../navigation";
import { useMutation, gql } from "@apollo/client";
import { Mutation } from "../../generated/graphql";
export type SingInParams =
  | {
      email: string;
      pass: string;
    }
  | {
      token: string;
    };
export const useSignIn = (settings: { onComplete: () => void }) => {
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
          console.log("sign in complete ", t);
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
                // Send token to your backend via HTTPS
                // ...
                mySetUserToken(idToken);
                settings.onComplete();
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
          console.log("sign in complete");
          navigateTo("home");
        })
        .catch(console.error);
    }
  };
};

export const useSignUp = () => {
  const [signUpMutation, response] = useMutation<Mutation["signUp"]>(gql`
    mutation userSignUp {
      signUp
    }
  `);
  console.log("sign in data: ", response);
  console.log(response);
  const signIn = useSignIn({
    onComplete: () => {
      console.log("signed in");
    },
  });
  return (email: string, pass: string) => {
    firebaseApp
      .auth()
      .createUserWithEmailAndPassword(email, pass)
      .then(() => {
        console.log("signup complete");
        signUpMutation();
        signIn({
          email: email,
          pass: pass,
        });
      })
      .catch(console.error);
  };
};
