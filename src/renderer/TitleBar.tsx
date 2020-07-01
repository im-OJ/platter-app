import styled from "styled-components";
import * as React from "react";
import {
  CloseOutlined,
  MinusOutlined,
  PushpinOutlined,
  PushpinFilled,
} from "@ant-design/icons";
import { backgroundCol, isMac } from "../theme";
import os from "os";
import { remote } from "electron";
import { useState } from "react";

export const TitleBarHeight = 25;

const TitleBarWrap = styled.div`
  -webkit-app-region: drag;
  position: fixed;
  display: flex;
  height: ${TitleBarHeight}px;
  background-color: ${backgroundCol};
  left: 0;
  right: 0;
  padding: 4;
`;
const TitleBarSpace = styled.div`
  height: ${TitleBarHeight}px;
  width: 100%;
  background-color: ${backgroundCol};
  padding: 4;
  z-index: 99999999;
`;

const Clickable = styled.div`
-webkit-app-region: no-drag;
`

type Controls = "close" | "minimize" | "pin";

export const TitleBar = () => {
  const [isAlwaysOnTop, setAlwaysOnTop] = useState(false);
  console.log(os.platform);
  const controlOrder: Array<Controls> = isMac
    ? ["close", "minimize", "pin"]
    : ["pin", "minimize", "close"];
  const controls = {
    close: (
      <CloseOutlined
        style={{
          color: "red",
          paddingLeft: 2,
          paddingRight: 2,
        }}
        onClick={(e) => {
        
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
    pin: isAlwaysOnTop ? (
      <PushpinFilled
        style={{
          color: "cyan",
          paddingLeft: 2,
          paddingRight: 2,
        }}
        onClick={() => {
          remote?.BrowserWindow?.getFocusedWindow()?.setAlwaysOnTop(false);

          setAlwaysOnTop(false);
        }}
      />
    ) : (
      <PushpinOutlined
        style={{
          color: "cyan",
          paddingLeft: 2,
          paddingRight: 2,
        }}
        onClick={() => {
          remote?.BrowserWindow?.getFocusedWindow()?.setAlwaysOnTop(true);
          setAlwaysOnTop(true);
        }}
      />
    ),
  };

  return (
    <>
      <TitleBarWrap>
      <div style={{ padding: 2, width: "100%", height: "100%", flex: 1 }}>
          <Clickable style={{ float: isMac ? "left" : "right", margin: "auto", flexGrow: 1 }}>
            {controlOrder.map((val) => {
              // @ts-ignore
              return controls[val];
            })}
          </Clickable>
        </div>
      </TitleBarWrap>
      <TitleBarSpace />
    </>
  );
};
