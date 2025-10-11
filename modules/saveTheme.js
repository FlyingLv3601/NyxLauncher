const fs = require("fs");
const path = require("path");
const { nyxConfigPath } = require("./path.js");

function themeSave(bg, color, secondColor) {
    const data = {
        background: bg,
        color: color,
        sColor: secondColor
    };

    const jsonData = JSON.stringify(data);

        const filePath = path.join(nyxConfigPath, "userTheme.json");


    if (!fs.existsSync(nyxConfigPath)) {
        fs.mkdirSync(nyxConfigPath, { recursive: true });
    }

    fs.writeFile(filePath, jsonData, () => {});
}

module.exports = { themeSave };
