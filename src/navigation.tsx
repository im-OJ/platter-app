import * as React from "react";
import { Home } from "./Home";
import { useGlobalState } from "./renderer/App";
import { Upload } from "./components/Upload";
import _ from "lodash";
import Start from "./components/Start";
import Test from "./components/Test";
import { Profile } from "./components/MyProfile";
import { UserProfile } from "./components/UserProfile";
import { SettingsPage } from "./components/Settings/Settings";
import { TransitionGroup, Transition } from "react-transition-group";

type Location =
  | "home"
  | "upload"
  | "start"
  | "test"
  | "myProfile"
  | "profile"
  | "settings";

const screens: Record<Location, (p: any) => JSX.Element | null> = {
  home: () => <Home />,
  upload: () => <Upload />,
  start: () => <Start />,
  test: () => <Test />,
  myProfile: () => <Profile />,
  profile: (props) =>
    props && props.id ? <UserProfile id={props.id} /> : null,
  settings: () => <SettingsPage />,
};

const Toggle = (props: { children: JSX.Element; visible: boolean }) => {
  return <div hidden={!props.visible}>{props.children}</div>;
};

const fadeDuration = 100;

const defaultStyle = {
  transition: `opacity ${fadeDuration}ms ease-in-out`,
  opacity: 0,
};

const transitionStyles = {
  entering: { opacity: 0.5 },
  entered: { opacity: 1 },
  exiting: { opacity: 0 },
  exited: { opacity: 0 },
};

export const Navigator = (props: {
  onNavigate?: (destination: Location) => void;
}) => {
  const [navDestination] = useGlobalState("navDestination");
  const [navProps] = useGlobalState("navProps");

  return (
    <TransitionGroup>
      {_.map(screens, (Component, key) => {
        return (
          <Toggle key={key} visible={navDestination === key}>
            <Transition in={navDestination === key} timeout={1000}>
              {/* <Component {...navProps} /> */
              (state: "entering" | "entered" | "exiting" | "exited") => {
                return (
                  <div style={{ ...defaultStyle, ...transitionStyles[state] }}>
                    <p>{state}</p>
                    <Component {...navProps} />
                  </div>
                );
              }}
            </Transition>
          </Toggle>
        );
      })}
    </TransitionGroup>
  );
};

export const useNavigateTo = () => {
  const [_, setNavDestination] = useGlobalState("navDestination");
  const [__, setNavProps] = useGlobalState("navProps");
  _;
  __;
  return (destination: Location, props?: any) => {
    if (props) {
      setNavProps(props);
    }
    setNavDestination(destination);
  };
};

export const Link = (props: {
  destination: Location;
  children: JSX.Element;
}) => {
  const navigateTo = useNavigateTo();

  return (
    <div onClick={() => navigateTo(props.destination)}>{props.children}</div>
  );
};

export const useGetLocation = () => {};
