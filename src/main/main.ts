import { app, BrowserWindow, IpcMainEvent } from "electron";
declare var MAIN_WINDOW_WEBPACK_ENTRY: any;
const { ipcMain } = require("electron");

import electronDl from "electron-dl";
electronDl();
const prodView = false;

// require("update-electron-app")();

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require("electron-squirrel-startup")) {
  // eslint-disable-line global-require
  app.quit();
}

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow: any;

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

  // and load the index.html of the app.
  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);

  // Open the DevTools.
  if (!prodView) {
    mainWindow.webContents.openDevTools();
  }
  console.log("starting")
  BrowserWindow.getFocusedWindow()?.hide();
  // Emitted when the window is closed.
  mainWindow.on("closed", () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });
};
ipcMain.on(
  "ready", () => {
    BrowserWindow.getFocusedWindow()?.show();
  })
ipcMain.on(
  "dragSample",
  async (event: IpcMainEvent, file: { name: string; url: string }) => {
    const iconUrl =
      "https://icons.iconarchive.com/icons/xenatt/the-circle/512/Folder-Music-icon.png";

    const window = BrowserWindow.getFocusedWindow();
    if (!window) {
      return;
    }
   
    // download icon
    await electronDl
      .download(window, iconUrl, {
        directory: __dirname,
        filename: "icon.png",
      })
      .catch(() => {
        throw new Error("problem downloading icon");
      });

    // download sample
    const downloaded = await electronDl
      .download(window, file.url, {
        directory: __dirname,
        filename: file.name,
      })
      .catch(() => {
        throw new Error("problem downloading sample");
      });
    console.log("download complete");
    event.sender.startDrag({
      file: `${__dirname}/` + file.name,
      icon: `${__dirname}/icon.png`,
    });
    console.log(JSON.stringify(downloaded));
  }
);

ipcMain.on("download-item", (event: any, fileUrl: string) => {
  console.log("download");
});
// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", createWindow);

// Quit when all windows are closed.
app.on("window-all-closed", () => {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow();
  }
});
