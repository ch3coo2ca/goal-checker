// import { app, BrowserWindow } from "electron";
// import * as isDev from "electron-is-dev";
// import * as path from "path";
const moment = require("moment");
const electron = require("electron");
const { globalShortcut, app } = electron;
const BrowserWindow = electron.BrowserWindow;

const path = require("path");
const isDev = require("electron-is-dev");
const fs = require("fs");

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 900,
    height: 680,
    webPreferences: {
      nodeIntegration: true,
    },
  });
  mainWindow.loadURL(
    isDev
      ? "http://localhost:3000"
      : `file://${path.join(__dirname, "../build/index.html")}`
  );
  // Open the DevTools.
  if (isDev) {
    mainWindow.webContents.openDevTools();
  }

  mainWindow.on("closed", () => (mainWindow = null));
}

const filePath = `${app.getPath("userData")}\\Logs`;
const filename = "GoalChecker.log";
const date = moment().format("YYYYMMDD");

app.on("ready", () => {
  createWindow();
  globalShortcut.register("CommandOrControl+Shift+I", () => {
    mainWindow.webContents.openDevTools();
  });

  //Check for Logs Directory
  if (!fs.existsSync(filePath)) {
    fs.mkdir(filePath, (err) => {
      if (!err) {
        log(`Directory : ${filePath} created.`);
        const path = `${filePath}\\${filename}.${date}`;

        fs.writeFile(path, "", (err) => {
          if (err) {
            log(`File : ${path} initialize error.`, err);
            return;
          }

          log(`File : ${path} created.`);
        });
      }
    });
  }
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("will-quit", () => {
  globalShortcut.unregisterAll();
});

app.on("activate", () => {
  if (mainWindow === null) {
    createWindow();
  }
});

const log = (msg, err) => {
  const timeStamp = moment().toString();
  if (!err) err = "";

  const log = `${timeStamp} | ${msg} | ${err} \n`;

  fs.appendFile(
    `${app.getPath("userData")}\\Logs\\${filename}.${date}`,
    log,
    (err) => {
      if (err) {
        log(`File : ${filename} append failure.`);
        return;
      }
    }
  );
};
