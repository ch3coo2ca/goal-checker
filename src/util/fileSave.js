import * as CODE from "const/dataType.js";
const { remote } = require("electron");
const { app } = remote;
const fs = require("fs");
const path = `${app.getPath("userData")}\\backup.txt`;

export const saveFile = async (data) => {
  await fs.writeFile(path, JSON.stringify(data), (err) => {
    if (err) {
      alert(CODE.FILE_WRITE_FAIL, err);
      console.error("Error : ", CODE.FILE_WRITE_FAIL, err);
    }
  });
};

export const readFile = async () => {
  await checkFile();

  try {
    const data = await fs.promises.readFile(path, "utf8");
    return JSON.parse(data);
  } catch (err) {
    alert(CODE.FILE_READ_FAIL, err);
    console.error("Error : ", CODE.FILE_READ_FAIL, err);
  }
};

export const checkFile = async () => {
  try {
    if (!fs.existsSync(path)) {
      console.error("Error : ", CODE.FILE_NOT_EXIST);
      await saveFile([]);
    }
  } catch (err) {
    console.log("Error : ", CODE.FILE_CHECK_FAIL, err);
  }
};
