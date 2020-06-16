import { ipcMain, BrowserWindow, IpcMainEvent } from "electron";
import electronDl from "electron-dl";

export const receiver = () => {
  ipcMain.on("ready", () => {
    // loadingWindow.hide()
    console.log("ready");
    BrowserWindow.getAllWindows().map((window) => {
      console.log(window.getTitle());
      // this should be smarter
      if (window.getTitle() != "Platter") {
        console.log("closing loading window");
        window.hide();
        window.close();
      } else {
        window.show();
        window.setAlwaysOnTop(true);
        window.setAlwaysOnTop(false);
      }
    });
  });
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

  ipcMain.on("download-item", async (event: any, p) => {
    const window = BrowserWindow.getFocusedWindow();
    if (!window) {
      return;
    }
    const { url, path, name } = p;
    url;
    console.log("download", path);
    await electronDl
      .download(window, url, {
        directory: path,
        filename: name,
      })
      .then(() => {
        console.log("download complete");
      })
      .catch(() => {
        throw new Error("problem downloading sample");
      });
  });
};
