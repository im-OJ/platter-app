import * as React from "react";
import styled from "styled-components";

export const Page = (props: { children: JSX.Element }) => {
  return <PageWrap>{props.children}</PageWrap>;
};

const PageWrap = styled.div`
  display: flex;
  height: 100%;
  overflow: hidden;
  left: 0;
  top: 0;
  right: 0;
  z-index: 5;
  width: 100%;
  height: 100%;
`;
