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

const signUpAPI = gql`
  mutation userSignUp {
    signUp {
      _id
      email
    }
  }
`;
export const useSignUp = () => {
  const [signUpMutation, response] = useMutation<Mutation["signUp"]>(signUpAPI);
  if (response.data) {
    console.log(response.data, response.error);
  }
  const signIn = useSignIn({
    onComplete: () => {
      signUpMutation()
        .then(() => {
          console.log("API Sign up complete, signing in");
        })
        .catch(console.error);
    },
  });
  return (email: string, pass: string) => {
    firebaseApp
      .auth()
      .createUserWithEmailAndPassword(email, pass)
      .then(() => {
        console.log("Firebase sign up complete, signing in");
        signIn({
          email: email,
          pass: pass,
        });
      })
      .catch(console.error);
  };
};
