const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const {mcLauncher} = require("./modules/minecraft-launcher.js")
const {userData} = require("./modules/createPlayer.js");
const fs = require("fs");
const {flags, commands} = require("./modules/commands.js");

function createWindow() {
  const win = new BrowserWindow({
    width: 700,
    height: 480,
    titleBarStyle: 'hidden',
    resizable: false,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true
    }
  });

  win.loadFile(path.join(__dirname, 'interface', 'index.html'));
}

ipcMain.on('log-input', (event, inputValue) => {
    if(inputValue.startsWith(commands[0])){
    //discord link in copy
    }
    else if(inputValue.startsWith(commands[1])){
    //youtube link in copy
    }else if(inputValue.startsWith(commands[2])){
      if (inputValue.includes(flags[0]) && inputValue.includes(flags[1])){
        let nick = inputValue.split("-n ")[1].split(" ")[0];
        let ver = inputValue.split("-v ")[1].split(" ")[0];
        mcLauncher(nick, ver);
      }else{
        const userData = require("./data/data.json");

        const username = userData.nickname;
        const version = userData.version;
        console.log(username);
        console.log(version)
        mcLauncher(username, version)
      }
    }else if(inputValue.startsWith(commands[3])){
      let nick = inputValue.split("-n ")[1].split(" ")[0];
      let ver = inputValue.split("-v ")[1].split(" ")[0];
      
      fs.access("data.json", fs.constants.F_OK, (err) => {
          userData(nick, ver);    
      });

    }else if(inputValue.startsWith(commands[4])){//kill
      app.quit()
    }else{
      //error not
    }
});

app.whenReady().then(createWindow);

