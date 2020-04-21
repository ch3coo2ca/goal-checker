const { remote } = require("electron");
const { app } = remote;
const fs = require("fs");
const path = `${app.getPath("userData")}\\backup.txt`;

export const saveFile = (data) => {
  fs.writeFile(path, JSON.stringify(data), (err) => {
    if (err) {
      alert("파일 저장 실패", err);
    }
    console.log("FILE_SAVE_SUCCESS");
  });
};

export const readFile = async () => {
  try {
    const data = await fs.promises.readFile(path, "utf8");
    return JSON.parse(data);
  } catch (err) {
    alert("파일 불러오기 실패", err);
    console.log("FILE_SAVE_ERROR", err);
  }
};
