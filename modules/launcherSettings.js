const fs = require("fs");
const path = require("path");
const { nyxConfigPath } = require("./path.js");

function LauncherSetting(ram) {
    const data = {
        ram: ram*1024, //1 gb = 1024mb :3
    };

    const jsonData = JSON.stringify(data, null, 1);

        const filePath = path.join(nyxConfigPath, "config.json");


    if (!fs.existsSync(nyxConfigPath)) {
        fs.mkdirSync(nyxConfigPath, { recursive: true });
    }

    fs.writeFile(filePath, jsonData, () => {});
}

module.exports = { LauncherSetting };
