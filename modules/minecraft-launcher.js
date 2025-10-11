const { Client, Authenticator } = require('minecraft-launcher-core');
const path = require('path');
const os = require('os');
const fs = require('fs');


const {nyxConfigPath} = require("./path.js");






function getMinecraftDir() {
    const platform = os.platform();
    
    switch (platform) {
        case 'win32':
            return path.join(process.env.APPDATA, '.minecraft');
        case 'darwin': 
            return path.join(os.homedir(), 'Library', 'Application Support', 'minecraft');
    }
}

function mcLauncher(username, version) {


    const jsonPath = path.join(nyxConfigPath, "config.json");
    const rawData = fs.readFileSync(jsonPath, "utf8");
    const savedData = JSON.parse(rawData);

    const ram = savedData.ram;



    const launcher = new Client();

    const minecraftDir = getMinecraftDir();


    let opts = {
        authorization: Authenticator.getAuth(username),
        root: minecraftDir, 
        version: {
            number: version,  
            type: "release"
        },
        memory: {
            max: ram,
            min: "1024"
        }
    };

    launcher.launch(opts);
}

module.exports = { 
    mcLauncher
};