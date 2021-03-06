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
import { useSpring, animated } from "react-spring";
import { useState, useEffect } from "react";

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

export const Navigator = (props: {
  onNavigate?: (destination: Location) => void;
}) => {
  const [navDestination] = useGlobalState("navDestination");
  const [navProps] = useGlobalState("navProps");
  const [restartFadeIn, setRestartFadeIn] = useState(false);
  const fadeIn = useSpring({
    opacity: 1,
    from: { opacity: 0 },
    reset: restartFadeIn,
    onRest: () => {},
    onStart: () => {
      setRestartFadeIn(false);
    },
    config: {
      tension: 150,
    },
  });

  useEffect(() => {
    setRestartFadeIn(true);
  }, [navDestination]);

  return (
    <>
      {_.map(screens, (Component, key) => {
        return (
          <Toggle key={key} visible={navDestination === key}>
            <animated.div style={fadeIn}>
              <Component {...navProps} />
            </animated.div>
          </Toggle>
        );
      })}
    </>
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
