import * as React from "react";
import styled from "styled-components";

export const Page = (props: { children: JSX.Element }) => {
  return <PageWrap>{props.children}</PageWrap>;
};

const PageWrap = styled.div`
  display: flex;
  flex: 1;
  height: 100%;
  overflow: hidden;
  min-height: 100%;

  left: 0;
  top: 0;
  right: 0;
  z-index: 1000;
  width: 100%;
  height: 100%;
  flex: 1;
`;
