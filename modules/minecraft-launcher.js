const { Client, Authenticator } = require('minecraft-launcher-core');
const path = require('path');
const os = require('os');

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
            max: "6048M",
            min: "1024M"
        }
    };

    launcher.launch(opts);
}

module.exports = { 
    mcLauncher
};