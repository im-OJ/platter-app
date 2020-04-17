import * as React from "react";
import { Home } from "./Home";
type Location = "home" | "upload" | "signup";
import { useGlobalState } from "./renderer/App";

const defaultLocation = "home";

let location: Location = defaultLocation;

const screens: Record<Location, JSX.Element> = {
  home: <Home />,
  upload: <p>upload</p>,
  signup: <p>signup</p>,
};

export const Navigator = () => {
  const [gLocation] = useGlobalState("location");

  // @ts-ignore
  return screens[gLocation];
};

export const useNavigateTo = () => {
  const [gLocation, setGLocation] = useGlobalState("location");
  console.log("at ", gLocation);
  return (destination: Location) => {
    location = destination;
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
