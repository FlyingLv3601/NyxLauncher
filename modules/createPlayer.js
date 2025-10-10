const fs = require("fs");

function userData(username, version) {
    const data = {
        nickname: username,
        version: version
    }
    const jsonData = JSON.stringify(data, null, 2); 
    fs.writeFile("data/data.json", jsonData, (err) => {    });
}

module.exports = {userData};


