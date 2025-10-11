const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const fs = require("fs");

const { mcLauncher } = require("./modules/minecraft-launcher.js");
const { userData } = require("./modules/createPlayer.js");
const { flags, commands } = require("./modules/commands.js");
const { nyxConfigPath } = require("./modules/path.js");
const {LauncherSetting} = require("./modules/launcherSettings.js");
const {themeSave} = require("./modules/saveTheme.js");

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
  const jsonPath = path.join(nyxConfigPath, "data.json");

  if (inputValue.startsWith(commands[0])) {
    if (inputValue.includes(flags[0]) && inputValue.includes(flags[1]) || inputValue.includes(flags[1]) && inputValue.includes(flags[0])) {
      const nick = inputValue.split("-n ")[1].split(" ")[0];
      const ver = inputValue.split("-v ")[1].split(" ")[0];
      mcLauncher(nick, ver);
    } else {
      if (fs.existsSync(jsonPath)) {
        const rawData = fs.readFileSync(jsonPath, "utf8");
        const savedData = JSON.parse(rawData);

        const username = savedData.nickname;
        const version = savedData.version;

        mcLauncher(username, version);
      }
    }


  } else if (inputValue.startsWith(commands[1])) {
    const nick = inputValue.split("-n ")[1].split(" ")[0];
    const ver = inputValue.split("-v ")[1].split(" ")[0];

    userData(nick, ver);

  } else if (inputValue.startsWith(commands[2])) {
    app.quit();
  } else if (inputValue.startsWith(commands[3])) {
      const ram = inputValue.split("-r ")[1].split(" ")[0];
      LauncherSetting(ram);
  }
});

ipcMain.on("theme", (event, bg, color, secondColor) => {
  themeSave(bg, color, secondColor);
});

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
