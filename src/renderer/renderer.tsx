import * as React from "react";
import { render } from "react-dom";
import { App } from "./App";
import { TitleBar } from "./TitleBar";

render(
  <>
    <TitleBar />
    <App />
  </>,
  document.getElementById("root")
);
