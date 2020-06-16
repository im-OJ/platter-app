import { ipcRenderer } from "electron";

export const ready = () => ipcRenderer.send("ready");

export const downloadItem = (p: { url: string; path: string; name: string }) =>
  ipcRenderer.send("download-item", p);

export const dragSample = (p: { name: string; url: string }) =>
  ipcRenderer.send("dragSample", p);

export const folderSelect = (p: { responseId: string }) =>
  ipcRenderer.send("folderSelect", p);
