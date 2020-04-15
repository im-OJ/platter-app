import * as React from "react";
import { Home } from "./Home";
type Location = "home" | "upload" | "signup";
import { useGlobal } from "reactn";
import { useEffect } from "react";

const defaultLocation = "home";

let location: Location = defaultLocation;

const screens: Record<Location, JSX.Element> = {
  home: <Home />,
  upload: <></>,
  signup: <></>,
};

export const Navigator = () => {
  useEffect(() => {
    console.log("location change");
    // Todo - history
  }, [location]);

  return screens[location];
};
export const useNavigateTo = (destination: Location) => {
  location = destination;
};

export const useGetLocation = () => {};
