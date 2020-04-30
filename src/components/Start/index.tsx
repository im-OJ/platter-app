import * as React from "react";
import styled from "styled-components";
import { Card, Modal } from "antd";

import { LogIn } from "./Login";
import { useState } from "react";
import { useNavigateTo } from "../../navigation";

const AbsoluteFull = styled(Card)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  justify-content: center;
  align-items: center;
`;

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
        afterClose={() => {}}
      >
        <LogIn
          onSignInComplete={() => {
            navigateTo("home");
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
