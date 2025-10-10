const si = require('systeminformation');

async function getGPUModels() {
    const graphics = await si.graphics();
    const models = graphics.controllers.map(gpu => gpu.model); 
    models.forEach(model => console.log(model));
}

getGPUModels();