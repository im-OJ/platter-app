import * as React from "react";
import { Page } from "../Page";
// import { remote } from "electron";
import { ipcRenderer } from "electron";

export const Profile = () => {
  return (
    <Page>
      <>
        <div
          style={{
            width: "60%",
            height: 200,
            backgroundColor: "Green",
          }}
          draggable
          onDragStart={() => {
            console.log("dragging");
            ipcRenderer.send("dragSample", "item.txt");
          }}
        />
      </>
    </Page>
  );
};
