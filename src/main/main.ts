import { app, BrowserWindow } from "electron";
declare var MAIN_WINDOW_WEBPACK_ENTRY: any;


import electronDl from "electron-dl";
import { receiver } from "./receiver";
electronDl();
const prodView = true;
import fs from "fs"
import { loading } from "./loading";
// require("update-electron-app")();

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require("electron-squirrel-startup")) {
  // eslint-disable-line global-require
  app.quit();
}

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow: BrowserWindow | null;

const createWindow = () => {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: prodView ? 800 : 1100,
    height: 500,
    frame: false,
    title: "Platter",
    backgroundColor: "#fff",
    // frame: false,
    webPreferences: {
      nodeIntegration: true,
    },
  });

  const loadingWindow = new BrowserWindow({
    width: 200,
    height: 300,
    frame: false,
    title: "Loading",
    backgroundColor: "#fff",
    webPreferences: {
      nodeIntegration: true,
    },
  });


  console.log(MAIN_WINDOW_WEBPACK_ENTRY)
  // @ts-ignore
  fs.writeFile(__dirname + "/" + "loading.html", loading,() => {
    console.log("loading file created")
    loadingWindow.loadFile(__dirname + "/" + "loading.html")
  })


  mainWindow?.hide()
  // and load the index.html of the app.
  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY).then(() => {
    loadingWindow?.hide()
    mainWindow?.show()
  });

  
  // Open the DevTools.
  if (!prodView) {
    mainWindow.webContents.openDevTools();
  }

  console.log("starting")
  BrowserWindow.getFocusedWindow()?.hide();
  

  mainWindow.on("closed", () => {
    mainWindow = null;
  });
};

app.on("ready", createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (mainWindow === null) {
    createWindow();
  }
});

receiver()

