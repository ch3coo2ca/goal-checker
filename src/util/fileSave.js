export const saveFile = (data) => {
  const { remote } = require("electron");
  const { app } = remote;
  const fs = require("fs");

  const path = `${app.getPath("userData")}\\backup.txt`;

  fs.writeFile(path, JSON.stringify(data), (err) => {
    if (err) {
      alert('파일 저장 실패',err); 
    }
    console.log("FILE_SAVE_SUCCESS");
  });
};
