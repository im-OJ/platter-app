import * as React from "react";
import styled from "styled-components";
import { Card, Modal } from "antd";
import { AbsoluteFull } from "../Init";
import { LogIn } from "../Init/Login";

export const Start = () => {
  return (
    <FullScreen>
      <Card>
        <Modal
          title="Basic Modal"
          footer={null}
          visible={true}
          centered
          closable={false}
        >
          <LogIn />
        </Modal>
      </Card>
    </FullScreen>
  );
};

export const FullScreen = (props: { children: JSX.Element }) => {
  return <AbsoluteFull>{props.children}</AbsoluteFull>;
};

const Wrap = styled.div`
  width: 50%;
  height: 50%;
  overflow: auto;
  margin: auto;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  border: solid black;
  text-align: center;
`;
