import * as CODE from "const/dataType.js";
import moment from "moment";

const { remote } = require("electron");
const { app } = remote;
const fs = require("fs");
const path = `${app.getPath("userData")}\\backup.txt`;
const logFileName = "GoalChecker.log";
const date = moment().format("YYYYMMDD");

export const saveFile = async (data) => {
  await fs.writeFile(path, JSON.stringify(data), (err) => {
    if (err) {
      alert(CODE.FILE_WRITE_FAIL, err);
      log(CODE.FILE_WRITE_FAIL, err);
      return;
    }
    log(CODE.FILE_CREATE_SUCCESS);
  });
};

export const readFile = async () => {
  await checkFile();

  try {
    const data = await fs.promises.readFile(path, "utf8");
    return JSON.parse(data);
  } catch (err) {
    alert(CODE.FILE_READ_FAIL, err);
    log(CODE.FILE_READ_FAIL, err);
  }
};

export const checkFile = async () => {
  try {
    if (!fs.existsSync(path)) {
      log(CODE.FILE_NOT_EXIST);
      await saveFile([]);
    }
  } catch (err) {
    log(CODE.FILE_CHECK_FAIL, err);
  }
};

export const log = (msg, err) => {
  const timeStamp = moment().toString();
  if (!err) err = "";

  const log = `${timeStamp} | ${msg} | ${err} \n`;

  fs.appendFile(
    `${app.getPath("userData")}\\Logs\\${logFileName}.${date}`,
    log,
    (err) => {
      if (err) {
        log(CODE.FILE_APPEND_FAIL, err);
        return;
      }
    }
  );
};
