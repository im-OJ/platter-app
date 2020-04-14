import * as React from "react";
import { Button } from "antd";
import styled from "styled-components";

import "antd/dist/antd.css";
import { Home } from "../Home";
export const App = () => {
  return <Home />;
};

const Shadow = styled.div`
  border-radius: 0px;
  background: #55b9f3;
  box-shadow: 12px 12px 24px #3d85af, -12px -12px 24px #6dedff;
`;
