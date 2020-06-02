import * as React from "react";
import { render } from "react-dom";
import { App } from "./App";
import styled from "styled-components";

const TitleBarWrap = styled.div`
  -webkit-app-region: drag;
  position: absolute;
  height: 20px;
  background-color: red;
  left: 0;
  right: 0;
`;
const TitleBarSpace = styled.div`
  height: 20px;
  background-color: red;
  width: 100%;
`;

const TitleBar = () => {
  return (
    <>
      <TitleBarWrap /> <TitleBarSpace />
    </>
  );
};

render(
  <>
    <TitleBar />

    <App />
  </>,
  document.getElementById("root")
);
