// import { app, BrowserWindow } from "electron";
// import * as isDev from "electron-is-dev";
// import * as path from "path";

const electron = require("electron");
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const {
  default: installExtension,
  REACT_DEVELOPER_TOOLS,
} = require("electron-devtools-installer");

const path = require("path");
const isDev = require("electron-is-dev");

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 900,
    height: 680,
    webPreferences: {
      nodeIntegration: true
    },
  });
  mainWindow.loadURL(
    isDev
      ? "http://localhost:3000"
      : `file://${path.join(__dirname, "../build/index.html")}`
  );
  // if (isDev) {
  // Open the DevTools.
  //BrowserWindow.addDevToolsExtension('<location to your react chrome extension>');
  mainWindow.webContents.openDevTools();
  // }
  mainWindow.on("closed", () => (mainWindow = null));
}

// app.whenReady().then(() => {
//   installExtension(REACT_DEVELOPER_TOOLS)
//     .then((name) => console.log(`Added Extension : ${name}`))
//     .catch((err) => console.error("An error occured ", err));
// });

app.on("ready", () => {
  createWindow();
});

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
