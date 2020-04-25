import * as React from "react";
import styled from "styled-components";
import { Card } from "antd";
import { LogIn } from "../Start/Login";
export const Init = () => {
  return <AbsoluteFull></AbsoluteFull>;
};

export const AbsoluteFull = styled(Card)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  justify-content: center;
  align-items: center;
`;
