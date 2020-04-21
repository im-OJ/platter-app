import * as React from "react";
import styled from "styled-components";
import { Card, Modal } from "antd";
import { AbsoluteFull } from "../Init";
import { LogIn } from "../Init/Login";
import { useState } from "react";
import { useNavigateTo } from "../../navigation";

export const Start = () => {
  const [modalVisible, setModalVisible] = useState(true);
  const navigateTo = useNavigateTo();
  return (
    <FullScreen>
      <Modal
        title={null}
        footer={null}
        visible={modalVisible}
        centered
        width={350}
        closable={false}
        afterClose={() => {
          navigateTo("home");
        }}
      >
        <LogIn
          onSignInComplete={() => {
            setModalVisible(false);
          }}
        />
      </Modal>
    </FullScreen>
  );
};

export const FullScreen = (props: { children: JSX.Element }) => {
  return <AbsoluteFull>{props.children}</AbsoluteFull>;
};
