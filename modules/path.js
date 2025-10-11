const os  = require("os");

const path = require("path");


const documentsPath = path.join(os.homedir(), 'Documents');

const nyxConfigPath = path.join(documentsPath, 'NyxConfig');


module.exports = {nyxConfigPath};