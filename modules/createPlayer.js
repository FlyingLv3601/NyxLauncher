const fs = require("fs");
const path = require("path");
const { nyxConfigPath } = require("./path.js");

function userData(username, version) {
    const data = {
        nickname: username,
        version: version
    };

    const jsonData = JSON.stringify(data, null, 2);

        const filePath = path.join(nyxConfigPath, "data.json");


    if (!fs.existsSync(nyxConfigPath)) {
        fs.mkdirSync(nyxConfigPath, { recursive: true });
    }

    fs.writeFile(filePath, jsonData, () => {});
}

module.exports = { userData };
