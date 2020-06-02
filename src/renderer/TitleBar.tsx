import styled from "styled-components";
import * as React from "react";
import { CloseOutlined, MinusOutlined } from "@ant-design/icons";
import { backgroundCol, isMac } from "../theme";
import os from "os";
import { remote } from "electron";

const HEIGHT = 25;

const TitleBarWrap = styled.div`
  -webkit-app-region: drag;
  position: absolute;
  display: flex;
  height: ${HEIGHT}px;
  background-color: ${backgroundCol};
  left: 0;
  right: 0;
  padding: 4;
`;
const TitleBarSpace = styled.div`
  height: ${HEIGHT}px;
  width: 100%;
  background-color: ${backgroundCol};
  padding: 4;
`;

type Controls = "close" | "minimize";

export const TitleBar = () => {
  console.log(os.platform);
  const controlOrder: Array<Controls> = isMac
    ? ["close", "minimize"]
    : ["minimize", "close"];
  const controls = {
    close: (
      <CloseOutlined
        style={{
          color: "red",
          paddingLeft: 2,
          paddingRight: 2,
        }}
        onClick={() => {
          window.close();
        }}
      />
    ),
    minimize: (
      <MinusOutlined
        style={{
          color: "yellow",
          paddingLeft: 2,
          paddingRight: 2,
        }}
        onClick={() => {
          remote?.BrowserWindow?.getFocusedWindow()?.minimize();
        }}
      />
    ),
  };
  return (
    <>
      <TitleBarWrap>
        <div style={{ padding: 2, width: "100%", height: "100%", flex: 1 }}>
          <span style={{ float: isMac ? "left" : "right", margin: "auto" }}>
            {controlOrder.map((val) => {
              // @ts-ignore
              return controls[val];
            })}
          </span>
        </div>
      </TitleBarWrap>
      <TitleBarSpace />
    </>
  );
};
