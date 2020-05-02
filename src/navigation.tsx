import * as React from "react";
import { Home } from "./Home";
import { useGlobalState } from "./renderer/App";
import { Upload } from "./components/Upload";
import _ from "lodash";
import Start from "./components/Start";
import Test from "./components/Test";
type Location = "home" | "upload" | "start" | "test";

const screens: Record<Location, JSX.Element> = {
  home: <Home />,
  upload: <Upload />,
  start: <Start />,
  test: <Test />,
};

const Toggle = (props: { children: JSX.Element; visible: boolean }) => {
  return <div hidden={!props.visible}>{props.children}</div>;
};

export const Navigator = () => {
  const [gLocation] = useGlobalState("location");
  // @ts-ignore
  return (
    <>
      {_.map(screens, (component, key) => {
        return <Toggle visible={gLocation === key}>{component}</Toggle>;
      })}
    </>
  );
};

export const useNavigateTo = () => {
  const [_, setGLocation] = useGlobalState("location");
  _;
  return (destination: Location) => {
    setGLocation(destination);
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
